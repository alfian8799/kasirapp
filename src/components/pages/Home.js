import React, { Component } from "react";
import Menus from "../Menus";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import ListCategories from "../ListCategories";
import Hasil from "../Hasil";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import FooterEnd from "../FooterEnd";

// membuat faction
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: [],
      categoriesYangDipilih: "Minuman",
      keranjangs: [],
    };
  }

  // mengambil data makanan
  componentDidMount() {
    axios
      .get(
        API_URL + "products?category.nama=" + this.state.categoriesYangDipilih
      )
      .then((res) => {
        // console.log("Response:", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("erorrr  yaa", error);
      });

    // menampilkan keranjang ke dalam Hasil
    this.getListKeranjang();
    // axios
    //   .get(API_URL + "keranjangs")
    //   .then((res) => {
    //     // console.log("Response:", res);
    //     const keranjangs = res.data;
    //     this.setState({ keranjangs });
    //   })
    //   .catch((error) => {
    //     console.log("erorrr  yaa", error);
    //   });
  }

  // menmpilkan hasi secara real time
  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         console.log("Response:", res);
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       .catch((error) => {
  //         console.log("erorrr  yaa", error);
  //       });
  //   }
  // }
  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        // console.log("Response:", res);
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("erorrr  yaa", error);
      });
  };

  // mengubah category
  changeCategory = (value) => {
    this.setState({
      // mengubah category
      categoriesYangDipilih: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        // console.log("Response:", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("erorrr  yaa", error);
      });
  };

  // Memasukan ke keranjang
  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Berhasil",
                text: "Berhasil Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch((error) => {
              console.log("erorrr  yaa", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Berhasil",
                text: "Berhasil Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch((error) => {
              console.log("erorrr  yaa", error);
            });
        }
      })
      .catch((error) => {
        console.log("erorrr  yaa", error);
      });
  };

  // menampilkan data makanan ke webs
  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
      <div>
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              categoriYangDipilih={categoriYangDipilih}
            />
            <Col>
              <p className="mt-2">
                <strong className="">Daftar Produk</strong>
              </p>
              <Row className="mt-2">
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil
              keranjangs={keranjangs}
              {...this.props}
              getListKeranjang={this.getListKeranjang}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
