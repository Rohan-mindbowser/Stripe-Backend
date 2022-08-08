const expect = require("chai").expect;
const should = require("chai").should;
const chaiHttp = require("chai-http");
var chai = require("chai");

const server = require("../server");

chai.use(chaiHttp);

describe("Stripe Testing", () => {
  //Test case for getting product details
  it("should return product details..", (done) => {
    chai
      .request(server)
      .get("/product/getproducts")
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  //Test case for getting stripe checkout url
  it("should return stripe checkout url..", (done) => {
    chai
      .request(server)
      .post("/product/checkout")
      .send({
        quantity: 2,
        product_details: {
          product_name: "Apple airpods",
          images: [
            "https://m.media-amazon.com/images/I/71bhWgQK-cL._SL1500_.jpg",
          ],
          price: 299,
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  });
});
