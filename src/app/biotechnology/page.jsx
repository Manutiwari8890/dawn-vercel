import Link from "next/link";

export const metadata = {
  title: "Biotechnology - Dawnscietific",
  description:
    "In simple terms, biotechnology is a technology that is based on biology and uses biomolecular processes to improve and create new technologies.",

  keywords: ["scientific laboratory supplier in USA", "Scientific Products Distributor USA", "Laboratory Chemicals Supplier New Jersey", "Laboratory Solutions Provider", "Ready to use solutions", "HPLC Solvents", "GC solvents", "Trusted Laboratory Chemicals and Supplies Company in USA", "Laboratory Chemicals and Consumables Supplier for Research Labs", "ISO Certified Laboratory Supplier in New Jersey", "WBENC certified scientific supplier in USA", "Where can research laboratories buy scientific supplies in USA", "Who Is a Trusted Laboratory Supplier in New Jersey", "Stains and indicators for microbiology and histology", "high purity inorganic and organic reagents"],

  alternates: {
    canonical: "https://dawnscientific.com/biotechnology",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Biotechnology - Dawnscietific",
    description:
      "In simple terms, biotechnology is a technology that is based on biology and uses biomolecular processes to improve and create new technologies.",
    url: "https://dawnscientific.com/biotechnology",
    siteName: "Dawn Scientific",
    type: "website",
    locale: "en_IN",

    images: [
      {
        url: "http://dawnscientific.com/assets/images/Dawn-scientific.png",
        width: 1200,
        height: 630,
        alt: "Dawn Scientific",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Biotechnology - Dawnscietific",
    description:
      "In simple terms, biotechnology is a technology that is based on biology and uses biomolecular processes to improve and create new technologies.",
    images: [
      "http://dawnscientific.com/assets/images/Dawn-scientific.png",
    ],
  },
};

export default function Page(){
    return (
        <>
            <div className='wrapper industry_inner'>
                <section className='ind_section back_gray'>
                    <div className='container'>
                        <div className='row'>
                            <h1>Biotechnology</h1>
                            <p>In simple terms, biotechnology is a technology that is based on biology and uses biomolecular processes to improve and create new technologies. It applies the life sciences to chemical synthesis. In this unit, we will explore how biotechnology plays an increasingly important role in directly producing specialty chemicals through fermentation, such as citric acid, lactic acid, propane-1,3-diol, and certain amino acids. At Dawn Scientific, we offer a variety of Biotech Chemical Products in different forms, grades, and quantities. You can choose from our diverse selection, which includes Diversified Biotech container seals, tough-spots, Biotech gel-handler, and more. We have chemicals like Acetone, Chloroform, Ethanol, Ethyl acetate, Iso propanol 91%, Phosphoric acid 85%, and Sodium Hypochlorite TS. These chemical products are versatile, waterproof, and resistant to both chemicals and temperature. By selecting any of our Biotech Chemical products, you can enhance the accuracy of your data.</p>
                        </div>
                    </div>
                </section>

                <section className='ind_section pb_0'>
                    <div className='container'>
                        <div className='row'>
                            <h2>List of Chemicals</h2>
                            <div className='ind_table'>
                                <div className='table_responsice w_100'>
                                    <table className='table' cellPadding={0} cellSpacing={0}>
                                        <tbody>
                                            <tr>
                                                <td><Link href="/product/acetone-10/"> CH5001</Link></td>
                                                <td><Link href="/product/acetone-10/"> Acetone ACS</Link></td>
                                                <td><Link href="/brand/chemier/">ChemieR</Link></td>
                                                <td>$29.62 - $274.62</td>
                                            </tr>
                                            <tr>
                                                <td><Link href="/product/chloroform-acs-4/"> CH5013</Link></td>
                                                <td><Link href="/product/chloroform-acs-4/"> Chloroform ACS</Link></td>
                                                <td><Link href="/brand/chemier/">ChemieR</Link></td>
                                                <td>$49.62 - $684.62</td>
                                            </tr>
                                            <tr>
                                                <td><Link href="/product/ethyl-acetate-acs/"> CH5034</Link></td>
                                                <td><Link href="/product/ethyl-acetate-acs/"> Ethyl Acetate ACS</Link></td>
                                                <td><Link href="/brand/chemier/">ChemieR</Link></td>
                                                <td>$49.62 - $329.62</td>
                                            </tr>
                                            <tr>
                                                <td><Link href="/product/91-isopropanol/"> CH5101</Link></td>
                                                <td><Link href="/product/91-isopropanol/"> Isopropyl alcohol 91% ACS</Link></td>
                                                <td><Link href="/brand/chemier/">ChemieR</Link></td>
                                                <td>$45.62 - $185.62</td>
                                            </tr>
                                            <tr>
                                                <td><Link href="/product/phosphoric-acid-85-acs/"> CH8048</Link></td>
                                                <td><Link href="/product/phosphoric-acid-85-acs/"> Phosphoric Acid 85% ACS</Link></td>
                                                <td><Link href="/brand/chemier/">ChemieR</Link></td>
                                                <td>$29.62 - $784.62</td>
                                            </tr>
                                            <tr>
                                                <td><Link href="/product/sodium-hypochlorite-ts/"> TS14260</Link></td>
                                                <td><Link href="/product/sodium-hypochlorite-ts/"> Sodium Hypochlorite TS</Link></td>
                                                <td><Link href="/brand/cusp/">cUSP</Link></td>
                                                <td>$35.62 - $84.62</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
