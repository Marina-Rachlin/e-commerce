import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const MainBannerEditor = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const createSlide = () => ({
    title: "",
    subtitle: "",
    blackFriday: false,
    discount: "",
    imagePreview: "",
  });
  const [slides, setSlides] = useState([createSlide()]); // Initial slide

  const logoHandler = (file, index) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = reader.result;
        setImagePreviews(newImagePreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSlide = () => {
    setSlides([...slides, createSlide()]);
  };

  const removeSlide = (index) => {
    const newSlides = [...slides];
    newSlides.splice(index, 1);
    setSlides(newSlides);
  };

  const schema = Yup.object().shape({
    slides: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Title is required!"),
        subtitle: Yup.string().required("Subtitle is required!"),
        blackFriday: Yup.boolean(),
        discount: Yup.number()
          .typeError("Discount price must be a valid number")
          .positive("Enter a valid positive price"),
      })
    ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: { slides },
  });

  const onSubmit = async (data) => {
    // Handle submitting data with multiple slides
    console.log(data);
  };

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="default-form">
      {slides.map((slide, index) => (
        <div key={index} className="row">
          <div className="uploading-outer">
            {/* Upload image input */}
            <div className="uploadButton">
              <input
                className="uploadButton-input"
                type="file"
                name={`slides[${index}].attachments[]`}
                accept="image/*"
                id={`upload-${index}`}
                required
                onChange={(e) => logoHandler(e.target.files[0], index)}
              />
              <label
                className={`uploadButton-button ripple-effect ${
                  imagePreviews[index] ? "no-arrow" : ""
                }`}
                htmlFor={`upload-${index}`}
              >
                {imagePreviews[index] ? (
                  <img
                    src={imagePreviews[index]}
                    alt="Uploaded Image"
                    className="image-preview"
                  />
                ) : (
                  "Browse Logo"
                )}
              </label>
              <span className="uploadButton-file-name"></span>
            </div>
            <div className="text">
              Max file size is 1MB, Minimum dimension: 330x300 And Suitable
              files are .jpg & .png
            </div>
          </div>

          {/* Other input fields for the slide */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Title</label>
            <Controller
              name={`slides[${index}].title`}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    placeholder=""
                    className={`${errors.slides?.[index]?.title ? "invalid" : ""}`}
                  />
                  {errors.slides?.[index]?.title && (
                    <div className="error">
                      {errors.slides[index].title.message}
                    </div>
                  )}
                </>
              )}
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Subtitle</label>
            <Controller
              name={`slides[${index}].subtitle`}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    placeholder=""
                    className={`${errors.slides?.[index]?.subtitle ? "invalid" : ""}`}
                  />
                  {errors.slides?.[index]?.subtitle && (
                    <div className="error">
                      {errors.slides[index].subtitle.message}
                    </div>
                  )}
                </>
              )}
            />
          </div>

          {/* <!-- Select --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>BlackFriday</label>
            <Controller
              name={`slides[${index}].blackFriday`}
              control={control}
              render={({ field }) => (
                <>
                  <select
                    {...field}
                    className={`${
                      errors.slides?.[index]?.blackFriday ? "chosen-single form-select invalid" : "chosen-single form-select"
                    }`}
                  >
                    <option>False</option>
                    <option>True</option>
                  </select>
                  {errors.slides?.[index]?.blackFriday && (
                    <div className="error">
                      {errors.slides[index].blackFriday.message}
                    </div>
                  )}
                </>
              )}
            />
          </div>

          {/* <!-- Input --> */}
          <div className="form-group col-lg-6 col-md-12">
            <label>Discount</label>
            <Controller
              name={`slides[${index}].discount`}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    placeholder=""
                    className={`${errors.slides?.[index]?.discount ? "invalid" : ""} `}
                  />
                  {errors.slides?.[index]?.discount && (
                    <div className="error">
                      {errors.slides[index].discount.message}
                    </div>
                  )}
                </>
              )}
            />
          </div>

          {slides.length > 1 && (
            <div className="form-group col-lg-12 col-md-12 text-right mt-4">
              <button
                type="button"
                className="theme-btn btn-style-three"
                onClick={() => removeSlide(index)}
                style={{ marginTop: '40px' }}
              >
                Remove Slide
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="form-group col-lg-12 col-md-12 text-right mt-4">
        <button
          type="button"
          className="theme-btn btn-style-three"
          onClick={addSlide}
        >
          Add Slide
        </button>
      </div>

      <div className="form-group col-lg-12 col-md-12 text-right mt-4">
        <button
          type="button"
          className="theme-btn btn-style-three"
          onClick={handleFullScreenToggle}
        >
          {isFullScreen ? "Exit Full Screen" : "See Preview"}
        </button>
      </div>

      <div className="form-group col-lg-12 col-md-12 text-right">
        <button type="submit" className="theme-btn btn-style-one" style={{ marginRight: '20px' }}>
          Save Banner
        </button>

        <button type="button" className="theme-btn btn-style-one">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MainBannerEditor;
