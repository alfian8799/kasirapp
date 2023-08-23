import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import React, { Component } from "react";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
    };
  }
  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  // tambah dan kurang dalam modal_keranjang
  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Update Pesanan",
          text: "Berhasil Update Pesanan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log("erorrr  yaa", error);
      });
  };

  // hapus pesanan
  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Hapus Pesanan",
          text:
            "Berhasil Hapus Pesanan " + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log("erorrr  yaa", error);
      });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-2 justify-content-end">
        <p>
          <strong>Hasil</strong>
        </p>
        <hr />
        {keranjangs.length !== 0 && (
          <ListGroup
            variant="flush"
            style={{
              cursor: "pointer",
            }}
          >
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => this.handleShow(menuKeranjang)}
                style={{
                  backgroundColor: "white",
                  transition: "background-color 0.2s", // Efek transisi untuk perubahan warna
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#dae0e6")
                } // Saat di-hover, ubah latar belakang menjadi gelap (gray)
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                } // Saat kursor keluar dari area, kembalikan latar belakang menjadi putih
              >
                <Row>
                  <Col xs={2}>
                    <p>
                      <Badge pill bg="info">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </p>
                  </Col>
                  <Col>
                    <p>{menuKeranjang.product.nama}</p>
                    <p>Rp.{menuKeranjang.product.harga}</p>
                  </Col>
                  <Col>
                    <strong className="float-right ">
                      Rp.{menuKeranjang.total_harga}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalKeranjang
              handleClose={this.handleClose}
              {...this.state}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandler={this.changeHandler}
              handleSubmit={this.handleSubmit}
              hapusPesanan={this.hapusPesanan}
            />
          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
