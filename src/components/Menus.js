import React from "react";
import { Col, Card } from "react-bootstrap";

function Menus({ menu, masukKeranjang }) {
  return (
    <Col md={3} xs="4" className="m-4 p-0">
      <Card
        style={{
          width: "12rem",
        }}
        onClick={() => masukKeranjang(menu)}
        className="shadow"
      >
        <Card.Img
          variant="top"
          src={
            "./Asset/image/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body
          style={{
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#dae0e6")
          } // ubah latar belakang menjadi gelap
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          } //  kursor keluar dari area, kembalikan latar belakang menjadi transparan
        >
          <Card.Title className="fs-6">{menu.nama}</Card.Title>
          <Card.Text className="fs-6">Rp.{menu.harga}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Menus;
