export default function Footer() {
  return (
    <>
      <style jsx>{`
        color: white;
      `}</style>
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <span>2020 Zdompet. All rights reserved.</span>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="d-flex flex-row-reverse">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <span>contact@zdompet.com</span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <span>+62 5637 8882 9901</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
