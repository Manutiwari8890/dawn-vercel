import Link from "next/link"

export default function NotFound(){
    return (
        <>
            <section className="not-found">
                <div className="container">
                    <div className="row justify-content-center flex-column">
                        <div className="img-area text-center">
                            <img src="/assets/images/404.webp" alt="" />
                        </div>
                        <div className="title text-center">
                            <h2>OOPS ! PAGE NOT FOUND</h2>
                            <Link className="btn btn-primary" href="/">BACK TO HOME</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

