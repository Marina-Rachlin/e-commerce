"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useCreateProductMutation } from "../../../../redux/features/products/productApi";
import { toast } from "react-hot-toast";

const PostBoxForm = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [createProduct, { useLoading, isSuccess, error: isError }] =
    useCreateProductMutation();

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    description: Yup.string().required("Description is required!"),
    brand: Yup.string()
      .oneOf(
        [
          "Cosrx",
          "Manyo Factory",
          "Chanel",
          "Loreal",
          "Mediheal",
          "YOUTHFORIA",
        ],
        "Brand field must have at least 1 item"
      )
      .required("Brand is required!"),
    category: Yup.string()
      .oneOf(
        ["Body", "Hair", "Face", "Kids", "Makeup"],
        "Category field must have at least 1 item"
      )
      .required("Category field is required!"),
    stock: Yup.number()
      .required("Stock is required!")
      .typeError("Stock must be a valid number")
      .integer("Stock must be an integer"),
    price: Yup.number()
      .required("Price is required!")
      .typeError("Price must be a valid number")
      .positive("Enter a valid positive price"),
    discountPrice: Yup.number()
      .typeError("Discount price must be a valid number")
      .positive("Enter a valid positive price"),
  });

  const initialValues = {
    name: "",
    description: "",
    brand: "",
    category: "",
    stock: "",
    price: "",
    discountPrice: "",
    images: [],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    initialValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (images.length <= 0) {
      setError("At least 1 image is required!");
    } else {
      data.images = images;
      await createProduct(data);
    }
  };

  const imagesHandler = async (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/png"];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if the file with the same name already exists
      const isExist = images.some((image) => image.name === file.name);

      if (!isExist) {
        // Check file type
        if (allowedTypes.includes(file.type)) {
          try {
            // Read the image file as a data URL
            const dataURL = await readFileAsDataURL(file);

            setImages((images) => [
              ...images,
              { dataURL, name: file.name, type: file.type },
            ]);
            setError(""); // Clear any previous errors
          } catch (error) {
            setError("Error reading the file.");
          }
        } else {
          setError("Invalid file type. Allowed types are .jpg and .png");
        }
      } else {
        setError("File already exists");
      }
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          resolve(fileReader.result);
        }
      };

      fileReader.onerror = () => {
        reject(new Error("Error reading the file."));
      };

      fileReader.readAsDataURL(file);
    });
  };

  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product created successfully!");
    }
    if (isError) {
      if ("data" in isError) {
        toast.error(isError.data.message);
      }
    }
  }, [isSuccess, isError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  className={`${errors.name ? "invalid" : ""}`}
                />
                {errors.name && (
                  <small className="error">{errors.name.message}</small>
                )}
              </div>
            )}
          />
        </div>

        {/* <!-- Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Brand</label>
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className={`${
                    errors.brand
                      ? "  chosen-single form-select invalid"
                      : "chosen-single form-select"
                  }`}
                >
                  <option></option>
                  <option>Cosrx</option>
                  <option>Manyo Factory</option>
                  <option>Chanel</option>
                  <option>Loreal</option>
                  <option>Mediheal</option>
                  <option>YOUTHFORIA</option>
                </select>
                {errors.brand && (
                  <div className="error">{errors.brand.message}</div>
                )}
              </>
            )}
          />
        </div>

        {/* <!-- Description --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <>
                <textarea
                  {...field}
                  className={`${errors.description ? "invalid" : ""}`}
                />
                {errors.description && (
                  <div className="error">{errors.description.message}</div>
                )}
              </>
            )}
          />
        </div>

        {/* Start Upload images */}
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <div className="uploading-resume">
              <div className="uploadButton">
                <input
                  {...field}
                  className="uploadButton-input"
                  type="file"
                  accept="image/*"
                  id="upload"
                  multiple
                  onChange={imagesHandler}
                />
                <label className="cv-uploadButton" htmlFor="upload">
                  <span className="title">
                    Drop product images here to upload
                  </span>
                  <span className="text">
                    To upload file size is (Max 1Mb) and allowed file types are
                    (.jpg & .png)
                  </span>
                  <span className="theme-btn btn-style-three">
                    Select Files
                  </span>
                  {error !== "" ? (
                    <p className="ui-danger mb-0">{error}</p>
                  ) : undefined}
                </label>
                <span className="uploadButton-file-name"></span>
              </div>
            </div>
          )}
        />
        {/* End upload images */}

        {/* Start images Preview  */}
        <div className="files-preview">
          {images?.map((image, i) => (
            <div key={i} className="file-edit-box">
              <span
                className="la la-times delete-image"
                onClick={() => deleteImage(i)}
              ></span>
              <img
                className="preview-image"
                src={image.dataURL}
                alt={`Preview ${image.name}`}
              />
            </div>
          ))}
        </div>
        {/* End images Preview  */}

        {/* <!-- Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Category</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className={`${
                    errors.category
                      ? " chosen-single form-select invalid"
                      : "chosen-single form-select"
                  }`}
                >
                  <option></option>
                  <option>Body</option>
                  <option>Hair</option>
                  <option>Face</option>
                  <option>Kids</option>
                  <option>Makeup</option>
                </select>
                {errors.category && (
                  <div className="error">{errors.category.message}</div>
                )}
              </>
            )}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Stock</label>
          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  placeholder=""
                  className={`${errors.stock ? "invalid" : ""} `}
                />

                {errors.stock && (
                  <div className="error">{errors.stock.message}</div>
                )}
              </>
            )}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Regular Price</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  placeholder=""
                  className={`${errors.price ? "invalid" : ""}`}
                />
                {errors.price && (
                  <div className="error">{errors.price.message}</div>
                )}
              </>
            )}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Sale Price (optional)</label>
          <Controller
            name="discountPrice"
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  placeholder=""
                  className={`${errors.discountPrice ? "invalid" : ""}`}
                />
                {errors.discountPrice && (
                  <div className="error">{errors.discountPrice.message}</div>
                )}
              </>
            )}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">
            Save Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
