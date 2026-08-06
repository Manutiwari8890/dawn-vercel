export default function Page()
{
    return (
        <>
            <section className="authentication">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className="form-wrapper widget mt-4">
                            <div className="logo">
                                <h2>Please fill up below details to view ISO certificate</h2>
                            </div>
                            <form>
                                  <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" placeholder="First Name" />
                                  </div>
                                  <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" placeholder="Last Name" />
                                  </div>
                                  <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Email" />
                                  </div>
                                  <div className="form-group">
                                    <label>Contact Number</label>
                                    <input type="email" className="form-control" placeholder="Contact Number" />
                                  </div>  
                                  <div className="d-flex align-items-center">
                                    <button type="submit" className="btn btn-primary" aria-label="Submit">Submit</button>
                                  </div>
                                  <div className="message">
                                  </div>
                                </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
