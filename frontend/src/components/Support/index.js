import "./style.css"
import { useSelector } from "react-redux";

const Support = () => {
  const state = useSelector((state) => {
    return {
      language: state.auth.language
    };
  });
    return (   
        <section id="contact" className="contact" style={{paddingTop:"40px"}}>

        <div className="container" data-aos="fade-up" style={{paddingTop:"0"}}>
  
          <header className="section-header">
            <p>{state.language=="ar"?"تواصل معنا":"Contact Us"}</p>
          </header>
  
          <div className="row gy-4">
          {state.language=="ar"?
            <>
            
  
            <div className="col-lg-6">
              <form action="forms/contact.php" method="post" className="php-email-form">
                <div className="row gy-4">
  
                  <div className="col-md-6">
                    <input type="text" name="name" className="form-control" placeholder="الأسم" required style={{textAlign:"right"}}/>
                  </div>
  
                  <div className="col-md-6 ">
                    <input type="email" className="form-control" name="email" placeholder="الأيميل" required style={{textAlign:"right"}}/>
                  </div>
  
                  <div className="col-md-12">
                    <input type="text" className="form-control" name="subject" placeholder="الموضوع" required style={{textAlign:"right"}}/>
                  </div>
  
                  <div className="col-md-12">
                    <textarea className="form-control" name="message" rows="6" placeholder="الرسالة" required style={{textAlign:"right"}}></textarea>
                  </div>
  
                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
  
                    <button type="submit"
                    style={{backgroundColor:"rgb(34, 61, 102)",borderRadius:"18px"}}
                    >ارسل الرسالة</button>
                  </div>
  
                </div>
              </form>
  
            </div>
            <div className="col-lg-6">
  
              <div className="row gy-4">
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-geo-alt"></i>
                    <h3>{state.language=="ar"?"العنوان":"Address"}</h3>
                    <p>شارع الحسين,<br/>عمان 11943</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-telephone"></i>
                    <h3>{state.language=="ar"?"هاتفنا":"Call Us"}</h3>
                    <p>+962 77777777<br/>+962 88888888</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-envelope"></i>
                    <h3>{state.language=="ar"?"الايميل":"Email Us"}</h3>
                    <p>creativeminds@taslee7.com<br/>contact@taslee7.com</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-clock"></i>
                    <h3>{state.language=="ar"?"ساعات تواجدنا":"Open Hours"}</h3>
                    <p>{state.language=="ar"?"الأحد - الخميس":"Sunday - Thursday"}<br/>9:00AM - 05:00PM</p>
                  </div>
                </div>
              </div>
  
            </div>
            
            </>:
            <>
            <div className="col-lg-6">
  
              <div className="row gy-4">
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-geo-alt"></i>
                    <h3>{state.language=="ar"?"العنوان":"Address"}</h3>
                    <p>A108 Ali Hussien Street,<br/>Amman, Jubieha 11943</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-telephone"></i>
                    <h3>{state.language=="ar"?"هاتفنا":"Call Us"}</h3>
                    <p>+962 77777777<br/>+962 88888888</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-envelope"></i>
                    <h3>{state.language=="ar"?"الايميل":"Email Us"}</h3>
                    <p>creativeminds@taslee7.com<br/>contact@taslee7.com</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <i className="bi bi-clock"></i>
                    <h3>{state.language=="ar"?"ساعات تواجدنا":"Open Hours"}</h3>
                    <p>{state.language=="ar"?"الأحد - الخميس":"Sunday - Thursday"}<br/>9:00AM - 05:00PM</p>
                  </div>
                </div>
              </div>
  
            </div>
  
            <div className="col-lg-6">
              <form action="forms/contact.php" method="post" className="php-email-form">
                <div className="row gy-4">
  
                  <div className="col-md-6">
                    <input type="text" name="name" className="form-control" placeholder="Your Name" required/>
                  </div>
  
                  <div className="col-md-6 ">
                    <input type="email" className="form-control" name="email" placeholder="Your Email" required/>
                  </div>
  
                  <div className="col-md-12">
                    <input type="text" className="form-control" name="subject" placeholder="Subject" required/>
                  </div>
  
                  <div className="col-md-12">
                    <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                  </div>
  
                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
  
                    <button type="submit" 
                      style={{backgroundColor:"rgb(34, 61, 102)",borderRadius:"18px"}}
                    >Send Message</button>
                  </div>
  
                </div>
              </form>
  
            </div></>
          }
  
          </div>
  
        </div>
  
      </section>
       
    )
}
export default Support