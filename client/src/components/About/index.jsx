import React, { useEffect } from 'react';
import 'lightbox2/dist/css/lightbox.min.css';
import lightbox from 'lightbox2';

const About = () => {
    useEffect(() => {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        });
    }, []);

    return (
        <div>
            <header className="masthead"
                style={{ backgroundImage: "url('https://www.willeyssportscenter.com/images/fishing/fishing-top-1920.jpg')" }}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading">
                                <h1>Nasz sklep</h1>
                                <span className="subheading">Sklep ze sprzętem wędkarskim</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7 mb-5">
                            <p>
                                Witamy w naszym sklepie wędkarskim - prawdziwym rajskim miejscu 
                                dla wszystkich miłośników wędkarstwa! 
                                Jesteśmy dumni z tego, że możemy dostarczać naszym klientom 
                                najwyższej jakości sprzęt wędkarski oraz 
                                akcesoria, które pomogą im osiągnąć sukces na wodach.
                            </p>
                            <p>
                                Nasz sklep wędkarski to nie tylko miejsce, w którym można znaleźć 
                                szeroki wybór produktów, ale także 
                                przyjazne i kompetentne doradztwo. Nasz zespół składa się 
                                z doświadczonych wędkarzy, którzy mają pasję 
                                do tego sportu i chętnie podzielą się swoją wiedzą i wskazówkami. 
                                Bez względu na to, czy jesteś początkującym wędkarzem, 
                                czy doświadczonym mistrzem, jesteśmy tutaj, aby Ci pomóc.
                            </p>
                            <p>
                                W naszym sklepie znajdziesz pełen asortyment sprzętu 
                                wędkarskiego - wędki, kołowrotki, żyłki, przynęty, haczyki i 
                                wiele więcej. Współpracujemy tylko z renomowanymi producentami, 
                                aby zapewnić naszym klientom produkty najwyższej 
                                jakości i niezawodność. Niezależnie od tego, czy preferujesz 
                                wędkowanie w słodkiej wodzie, czy na morzu, mamy odpowiedni sprzęt dla Ciebie.
                            </p>
                            <p>
                                Dbamy również o to, aby nasze ceny były konkurencyjne, 
                                ponieważ chcemy, aby wędkarstwo było dostępne dla wszystkich. 
                                Oferujemy również różnego rodzaju promocje i rabaty, abyś mógł 
                                cieszyć się zakupami bez obciążania portfela.
                            </p>
                            <p>
                                Na naszej stronie internetowej znajdziesz również 
                                wiele przydatnych informacji na temat technik wędkarskich,
                                najlepszych miejsc do wędkowania, porad dotyczących 
                                konserwacji sprzętu i wiele więcej. Staramy się być nie 
                                tylko sklepem, ale również źródłem wiedzy dla naszych klientów.
                            </p>
                            <p>
                                Zapraszamy do odwiedzenia naszego sklepu wędkarskiego 
                                i dołączenia do naszej wędkarskiej społeczności. 
                                Gwarantujemy, że znajdziesz u nas wszystko, czego potrzebujesz, 
                                aby osiągnąć sukces na wodach i cieszyć się tym wspaniałym sportem. 
                                Do zobaczenia w sklepie!
                            </p>
                        </div>
                    </div>

                    <div className="row gx-4 gx-lg-5">
                        {Array.from({ length: 10 }, (_, index) => (
                            <div className="col-4 mb-4" key={index}>
                                <a href={`assets/img/nasz_sklep/image${index + 1}.jpg`} data-lightbox="galeria" data-title={`Obraz ${index + 1}`}>
                                    <img src={`assets/img/nasz_sklep/image${index + 1}.jpg`} className="w-100 shadow-1-strong rounded mb-4" alt={`Obraz ${index + 1}`} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;
