import {app} from "../app.js";
import request from "supertest";
import Gateway from "../models/gateway.model.js";
import Peripheral from "../models/peripheral.model.js";

let gatewayId1 = "";
let gatewayId2 = "";
let peripheralId1 = "";

const sampleGateway1 = {
  uid: "12345",
  name: "Sample Gateway",
  ipv4: "10.0.6.1",
};
const sampleGateway2 = {
  uid: "6789",
  name: "Sample Gateway2",
  ipv4: "10.0.6.2",
};
let samplePeripheral1 = {};

beforeEach(async () => {
  await Peripheral.deleteMany({});
  await Gateway.deleteMany({});

  const Gateway1 = new Gateway(sampleGateway1);
  await Gateway1.save();

  const Gateway2 = new Gateway(sampleGateway2);
  await Gateway2.save();

  gatewayId1 = Gateway1._id;
  gatewayId2 = Gateway2._id;

  samplePeripheral1 = {
    uid: "1",
    vendor: "asdasdasd",
    status: false,
    gateway: gatewayId2,
  };

  const Peripheral1 = new Peripheral(samplePeripheral1);
  peripheralId1 = Peripheral1._id;
  await Peripheral1.save();
});

describe("Gateways", () => {
  it("POST /gateways -> Create New Gateway", async () => {
    const data = {
      uid: "15",
      name: "Gateway123",
      ipv4: "10.0.6.1",
    };
    return await request(app)
      .post("/gateways")
      .send(data)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect.objectContaining({
          uid: expect.any(Number),
          vendor: expect.any(String),
          created_date: expect.any(String),
          status: expect.any(Boolean),
          gateway: expect.any(String),
          _id: expect.any(String),
          __v: expect.any(Number),
        });
      });
  });

  it("GET /gateways -> Array of Gateways", async () => {
    return await request(app)
      .get("/gateways")
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              uid: expect.any(String),
              name: expect.any(String),
              ipv4: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET /gateways/id -> Return 404 if not found", async () => {
    //Non existent ID
    const res = await request(app)
      .get("/gateways/631945e2ffe8edc98c771d2f")
      .send();
    expect(res.statusCode).toBe(404);
  });

  it("GET /gateways/id -> Gateway and its associated peripherals", async () => {
    return await request(app)
      .get(`/gateways/${gatewayId1}`)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            gateway: expect.any(Object, {
              _id: expect.any(String),
              uid: expect.any(String),
              name: expect.any(String),
              ipv4: expect.any(String),
              __v: expect.any(Number),
            }),
            peripheral: expect.any(Array, {
              _id: expect.any(String),
              uid: expect.any(Number),
              vendor: expect.any(String),
              created_date: expect.any(String),
              status: expect.any(Boolean),
              gateway: expect.any(String),
              __v: expect.any(Number),
            }),
          })
        );
      });
  });

  it("PATCH /gateways -> Update Gateway", async () => {
    const data = {
      uid: "12345",
      name: "Gateway123",
      ipv4: "10.0.6.1",
    };
    return await request(app)
      .patch(`/gateways/${gatewayId1}`)
      .send(data)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect.objectContaining({
          _id: expect.any(String),
          uid: expect.any(String),
          name: expect.any(String),
          ipv4: expect.any(String),
          __v: expect.any(Number),
        });
      });
  });

  it("DELETE /gateways -> Delete Gateway", async () => {
    return await request(app)
      .delete(`/gateways/${gatewayId1}`)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Peripherals", () => {
  it("POST /peripherals -> Create New Peripherals", async () => {
    const data = {
      uid: "12345",
      vendor: "Acer",
      status: false,
      gateway: gatewayId2,
    };

    return await request(app)
      .post("/peripherals")
      .send(data)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect.objectContaining({
            gateway: expect.any(Object, {
              _id: expect.any(String),
              uid: expect.any(String),
              name: expect.any(String),
              ipv4: expect.any(String),
              __v: expect.any(Number),
            }),
            peripheral: expect.any(Array, {
              _id: expect.any(String),
              uid: expect.any(Number),
              vendor: expect.any(String),
              created_date: expect.any(String),
              status: expect.any(Boolean),
              gateway: expect.any(String),
              __v: expect.any(Number),
            }),
          })
      });
  });

  it("GET /peripherals -> Array of peripherals", async () => {
    return await request(app)
      .get("/peripherals")
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              uid: expect.any(Number),
              vendor: expect.any(String),
              created_date: expect.any(String),
              status: expect.any(Boolean),
              gateway: expect.any(String),
              __v: expect.any(Number),
            }),
          ])
        );
      });
  });


  it("GET /peripherals/id -> Return 404 if not found", async () => {
    //Non existent ID
    const res = await request(app)
      .get("/peripherals/631945e2ffe8edc98c771d2f")
      .send();
    expect(res.statusCode).toBe(404);
  });

  it("GET /peripherals/id -> Peripheral by ID and its associated gateway", async () => {
    return await request(app)
      .get(`/peripherals/${peripheralId1}`)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                _id: expect.any(String),
                uid: expect.any(Number),
                vendor: expect.any(String),
                created_date: expect.any(String),
                status: expect.any(Boolean),

                gateway: expect.any(Object, {
                  _id: expect.any(String),
                  uid: expect.any(Number),
                  vendor: expect.any(String),
                  created_date: expect.any(String),
                  status: expect.any(Boolean),
                  gateway: expect.any(String),
                  __v: expect.any(Number),
                }),
                "__v": 0
              }),
        );
      });
  });

  it("PATCH /peripherals -> Update peripheral by ID", async () => {
    const data = {
        uid: 66666,
        vendor: "asdasdasdxxxxxa",
        created_date: "2022-09-07T03:16:26.975Z",
        status: true,
        gateway: gatewayId2
    };
    return await request(app)
      .patch(`/peripherals/${peripheralId1}`)
      .send(data)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect.objectContaining({
            _id: expect.any(String),
            uid: expect.any(Number),
            vendor: expect.any(String),
            created_date: expect.any(String),
            status: expect.any(Boolean),
            gateway: expect.any(String),
            __v: expect.any(Number)
        });
      });
  });

  it("DELETE /peripherals -> Delete peripherals by ID", async () => {
    return await request(app)
      .delete(`/peripherals/${peripheralId1}`)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

});
