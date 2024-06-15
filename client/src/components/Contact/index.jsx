import React from 'react';

const Contact = () => {
    return (
        <>
            {/* Page Header */}
            <header className="masthead" style={{ backgroundImage: `url('https://cdn.who.int/media/images/default-source/imported/contact-us.tmb-1200v.jpg?sfvrsn=fa0e6c6e_7')` }}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading">
                                <h1>Kontakt</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7 text-center">
                            <p>
                                <strong>Sklep Wędkarski "Wędka Marzeń"</strong><br />
                                Adres: ul. Wędkarska 123, 00-000 Miastowo<br />
                                Telefon: +48 123 456 789<br />
                                E-mail: info@wedkamarzen.pl<br />
                            </p>
                            <p>
                                <strong>Godziny otwarcia:</strong><br />
                                Poniedziałek - Piątek: 9:00 - 18:00<br />
                                Sobota: 10:00 - 15:00<br />
                                Niedziela: Zamknięte<br />
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Contact;
