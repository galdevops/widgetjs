import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
// import your default Image
import adImage from "./icons8-instagram-300.png";

const ImageForm = () => {
  // Ad Image useState
  const [file, setFile] = useState(null);
  const [selectedAdImages, setSelectedAdImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(adImage); // Default Image

  // Ad Image Input Error useState
  const [AdImageInputErr, setAdImageInputErr] = useState(false); // Initialize with false

  // Function to preview the selected ad image
  const PreviewAdImage = (selectedImages) => {
    if (selectedImages.length === 0) {
      setPreviewImage(adImage); // Set to adImage when no images are selected
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      // after read this file above onload fun run
      reader.readAsDataURL(selectedImages[0]);
    }
  };

  const handleAdimages = (event) => {
    setFile(event.target.files[0]);
    const selectedImages = Array.from(event.target.files);
    setAdImageInputErr(false);
    if (selectedAdImages.length + selectedImages.length <= 1) {
      // combined already selected and newly selected Images
      setSelectedAdImages((prevSelectedAdImages) => [
        ...prevSelectedAdImages,
        ...selectedImages,
      ]);

      PreviewAdImage([...selectedAdImages, ...selectedImages]);
    } else {
      alert("You can only select up to 1 files.");
    }
  };

  const handleRemoveAdImages = (index) => {
    const updatedAdImages = selectedAdImages.filter((_, i) => i !== index);
    setSelectedAdImages(updatedAdImages);
    PreviewAdImage(updatedAdImages);
  };

  const handleUpload = async () => {
    console.log('file! ',file)
    if (file) {
  
        const formData = new FormData();
        formData.append('file', file);
  
        try {
          const result = await fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData,
          });
  
          const data = await result.json();
  
          console.log('handleUpload: ', data);
          setTimeout(() => {
            console.log("Delayed for 4 seconds.");
          }, 4000)
        } catch (error) {
          console.error(error);
        }
      }
  };

  return (
    <Container>
      <h2>Ring Size Simulator</h2>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={12}>
          <Image src={previewImage} fluid alt="Item" />
        </Col>
      </Row>
      <Row>
        <Row className="d-flex justify-content-center">
          <Col
            className="AdsHome-right-cont justify-content-center"
            xs={12}
            md={12}
            lg={4}
          >
            <Form>
              <fieldset>
                <div className="mb-3">
                  <p className="mb-2">
                    Upload 5 Image (Ring / Finger){" "}
                    <sup>
                      <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
                    </sup>
                  </p>
                  <input
                    type="file"
                    onChange={handleAdimages}
                    multiple
                    accept=".jpg, .jpeg, .png"
                    className="BrowseImageInput form-control"
                  />
                  {AdImageInputErr && (
                    <p className="px-3 text-danger">Please select 1 image.</p>
                  )}
                  {selectedAdImages.length > 0 && (
                    <div className="p-3 d-flex gap-3">
                      <p>Selected Files:</p>
                      <ul>
                        {selectedAdImages.map((file, index) => (
                          <div
                            className="d-flex align-items-center justify-content-between gap-3"
                            key={index} // Moved key to the outer element
                          >
                            <li>{file.name}</li>
                            <i
                              className="fa-solid fa-trash fa-lg AddeleteImg"
                              onClick={() => handleRemoveAdImages(index)}
                            ></i>
                          </div>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <Button 
                    onClick={handleUpload}
                    variant="primary" type="submit">
                  Tell me what's the size
                </Button>
              </fieldset>
            </Form>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default ImageForm;
