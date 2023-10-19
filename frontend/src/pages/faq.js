import React from 'react'
import GiftSection from '../components/common/GiftSection'

const FaqPage = () => {
  return (
    <>
    <div className="faq-section mt-110 mb-110">
      <div className="container">
        <div className="faq-title">
          <h1>Frequently 
            <svg xmlns="http://www.w3.org/2000/svg" width={53} height={50} viewBox="0 0 53 50">
              <path d="M26.7227 10.7143L34.7395 0L35.1849 13.8393L48.1008 9.82143L40.084 20.792L53 25.4464L40.084 29.4643L48.1008 40.625L34.7395 36.1607V50L26.2773 38.8393L18.2605 50L17.8151 36.1607L4.89916 40.1786L12.916 29.4643L0 25L12.916 20.5357L4.89916 9.82143L18.2605 13.3929V0L26.7227 10.7143Z" />
            </svg> <br />
            <span>Asked Questions</span>
          </h1>
        </div>
        <div className="row g-4 mb-110">
          <div className="col-lg-4 ">
            <div className="faq-item">
              <h3>Orders &nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width={27} height={25} viewBox="0 0 27 25">
                  <path d="M13.3613 5.35714L17.3697 0L17.5924 6.91964L24.0504 4.91071L20.042 10.396L26.5 12.7232L20.042 14.7321L24.0504 20.3125L17.3697 18.0804V25L13.1387 19.4196L9.13025 25L8.90756 18.0804L2.44958 20.0893L6.45798 14.7321L0 12.5L6.45798 10.2679L2.44958 4.91071L9.13025 6.69643V0L13.3613 5.35714Z" />
                </svg>
              </h3>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="faq-content">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      01.  How can I place an order?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      02. What information do I need to provide when placing an order?
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      03. Can I make changes to my order after it has been placed?
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      04. How can I check the status of my order?
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                      05. What should I do if my order arrives damaged or incomplete?
                    </button>
                  </h2>
                  <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-4 mb-110">
          <div className="col-lg-4 ">
            <div className="faq-item">
              <h3>Products &nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width={27} height={25} viewBox="0 0 27 25">
                  <path d="M13.3613 5.35714L17.3697 0L17.5924 6.91964L24.0504 4.91071L20.042 10.396L26.5 12.7232L20.042 14.7321L24.0504 20.3125L17.3697 18.0804V25L13.1387 19.4196L9.13025 25L8.90756 18.0804L2.44958 20.0893L6.45798 14.7321L0 12.5L6.45798 10.2679L2.44958 4.91071L9.13025 6.69643V0L13.3613 5.35714Z" />
                </svg>
              </h3>
            </div>
          </div>
          <div className="col-lg-8"> 
            <div className="faq-content">
              <div className="accordion" id="accordionExample2">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading-01">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-01" aria-expanded="true" aria-controls="collapse-01">
                      01.  What are the features and specifications of the product?
                    </button>
                  </h2>
                  <div id="collapse-01" className="accordion-collapse collapse show" aria-labelledby="heading-01" data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading-02">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-02" aria-expanded="false" aria-controls="collapse-02">
                      02. Can I pre-order a product that is out of stock?
                    </button>
                  </h2>
                  <div id="collapse-02" className="accordion-collapse collapse" aria-labelledby="heading-02" data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading-03">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-03" aria-expanded="false" aria-controls="collapse-03">
                      03. How do I assemble or set up the product?
                    </button>
                  </h2>
                  <div id="collapse-03" className="accordion-collapse collapse" aria-labelledby="heading-03" data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading-04">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-04" aria-expanded="false" aria-controls="collapse-04">
                      04. Are batteries or any additional accessories included with the product?
                    </button>
                  </h2>
                  <div id="collapse-04" className="accordion-collapse collapse" aria-labelledby="heading-04" data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading-05">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-05" aria-expanded="false" aria-controls="collapse-05">
                      05. What is the weight and dimensions of the product?
                    </button>
                  </h2>
                  <div id="collapse-05" className="accordion-collapse collapse" aria-labelledby="heading-05" data-bs-parent="#accordionExample2">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-lg-4 ">
            <div className="faq-item">
              <h3>Gift Cards &nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width={27} height={25} viewBox="0 0 27 25">
                  <path d="M13.3613 5.35714L17.3697 0L17.5924 6.91964L24.0504 4.91071L20.042 10.396L26.5 12.7232L20.042 14.7321L24.0504 20.3125L17.3697 18.0804V25L13.1387 19.4196L9.13025 25L8.90756 18.0804L2.44958 20.0893L6.45798 14.7321L0 12.5L6.45798 10.2679L2.44958 4.91071L9.13025 6.69643V0L13.3613 5.35714Z" />
                </svg>
              </h3>
            </div>
          </div>
          <div className="col-lg-8"> 
            <div className="faq-content">
              <div className="accordion" id="accordionExample3">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading-06">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-06" aria-expanded="true" aria-controls="collapse-06">
                      01.  Can I purchase a gift card online?
                    </button>
                  </h2>
                  <div id="collapse-06" className="accordion-collapse collapse show" aria-labelledby="heading-06" data-bs-parent="#accordionExample3 ">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading-07">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-07" aria-expanded="false" aria-controls="collapse-07">
                      02. Can I choose the value or denomination of the gift card?
                    </button>
                  </h2>
                  <div id="collapse-07" className="accordion-collapse collapse" aria-labelledby="heading-07" data-bs-parent="#accordionExample3">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading-08">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-08" aria-expanded="false" aria-controls="collapse-08">
                      03. Can I personalize or customize the design of the gift card?
                    </button>
                  </h2>
                  <div id="collapse-08" className="accordion-collapse collapse" aria-labelledby="heading-08" data-bs-parent="#accordionExample3">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading-09">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-09" aria-expanded="false" aria-controls="collapse-09">
                      04. Can I check the remaining balance on the gift card?
                    </button>
                  </h2>
                  <div id="collapse-09" className="accordion-collapse collapse" aria-labelledby="heading-09" data-bs-parent="#accordionExample3">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="heading-10">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-10" aria-expanded="false" aria-controls="collapse-10 ">
                      05. What should I do if my gift card is lost or stolen?
                    </button>
                  </h2>
                  <div id="collapse-10" className="accordion-collapse collapse" aria-labelledby="heading-10" data-bs-parent="#accordionExample3">
                    <div className="accordion-body">
                      Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only Integer purus onthis
                      placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet non ipsul growing this 
                      Praesent commodo at massa eget suscipit. Utani vitae enim velit.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <GiftSection/> 
    </>
  )
}

export default FaqPage
