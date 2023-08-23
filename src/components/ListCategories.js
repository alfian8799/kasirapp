import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUtensils,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
  return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        // console.log("Response:", res);
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log("erorrr  yaa", error);
      });
  }

  render() {
    // console.log("Categories:", this.state.categories);
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;
    return (
      <Col md={2} className="mt-2">
        <p>
          <strong>Daftar Kategori</strong>
        </p>
        <ListGroup className="m-3">
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={
                  categoriYangDipilih === category.nama ? "category-aktif" : ""
                }
                style={{
                  cursor: "pointer",
                  transition: "background-color 0.2s", // Efek transisi untuk perubahan warna
                  backgroundColor:
                    categoriYangDipilih === category.nama
                      ? "#1b53a3"
                      : "initial",
                  color:
                    categoriYangDipilih === category.nama ? "#fff" : "initial",
                }}
                // Efek hover - ubah warna latar belakang menjadi biru saat di-hover
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1b53a3")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    categoriYangDipilih === category.nama
                      ? "#1b53a3"
                      : "initial")
                }
              >
                <p className="fw-semibold">
                  {category.nama === "Makanan" && (
                    <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                  )}
                  {category.nama === "Minuman" && (
                    <FontAwesomeIcon icon={faCoffee} />
                  )}
                  {category.nama === "Cemilan" && (
                    <FontAwesomeIcon icon={faCheese} className="mr-2" />
                  )}
                  {category.nama}
                </p>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
