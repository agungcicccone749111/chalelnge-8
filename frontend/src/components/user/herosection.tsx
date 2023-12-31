const HeroSection = (props: any) => {
    return (
        <section id="hero-section">
            <div className="container-fluid pr-5 pl-5 pt-5">
                <div className="row d-flex flex-row align-items-center pl-5 pr-5 pt-5">
                    <div className="hero-desc container-md col-md-6 col-sm-12 col-xs-12 pt-5 pr-5 pl-5">
                        <div className="hero-desc--text">
                            <h1>Sewa &amp; Rental Mobil Terbaik di Kawasan Bandung</h1>
                            <p>
                                Selamat datang di Binar Car Rental. Kami menyediakan mobil
                                kualitas terbaik dengan harga terjangkau. selalu siap melayani
                                kebutuhanmu untuk sewa mobil selama 24 jam.
                            </p>
                            {props.button === "a" && <a href="/cars" className="btn btn-success sewa">Mulai Sewa Mobil</a>}
                        </div>
                    </div>
                    <div className="hero-ills col-md-6 col-sm-12 col-xs-12">
                        <img src="https://i.ibb.co/Krg5rVN/img-car.png" alt="Hero-Image" className="img-fluid" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
