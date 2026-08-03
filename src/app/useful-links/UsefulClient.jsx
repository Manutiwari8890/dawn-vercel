"use client"
import { useRef } from "react";


export default function UsefulClient()
{
    const section1 = useRef(null);
    const section2 = useRef(null);
    const section3 = useRef(null);
    const section4 = useRef(null);
    const section5 = useRef(null);
    const section6 = useRef(null);
    const section7 = useRef(null);
    const section8 = useRef(null);
    const section9 = useRef(null);
    
    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <section className="page-title usefullink_title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>Useful Links</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="useful-wrapper">
                <div className="container toc toc_link">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="widget">
                                <p>Ready to take your chemistry knowledge to the next level? Check out Resources for the best tools and resources for learning about Laboratory Chemicals, Pharmaceutical Excipients, Aquaculture Specialties, and Food Grade Additives. Our selection of institutions provides the highest quality education and research. Get up to speed quickly with our comprehensive collection of educational materials and resources – start mastering chemistry today!</p>
                                <div className="table_wrapper">
                                    <table className="table links-table">
                                        <thead>
                                            <tr className="sticky">
                                                <th>Sr.No.</th>
                                                <th>Content</th>
                                                <th>Read more</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr onClick={() => scrollToSection(section1)}>
                                                <td>1</td>
                                                <td>Chemistry Website<a href="https://www.dawnscientific.com/resources/#Chemistry Resource"></a></td>
                                                <td>
                                                    <span className="btn btn-outline btn-sm">                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg></span>
                                                </td>
                                            </tr>
                                            <tr onClick={() => scrollToSection(section2)}>
                                                <td>2</td>
                                                <td>Basic SI Units</td>
                                                <td>
                                                    <span className="btn btn-outline btn-sm">                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg></span>
                                                </td>
                                            </tr>
                                            <tr onClick={() => scrollToSection(section3)}>
                                                <td>3</td>
                                                <td>Physical Constants</td>
                                                <td>
                                                    <span className="btn btn-outline btn-sm">                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg></span>
                                                </td>
                                            </tr>
                                            <tr onClick={() => scrollToSection(section4)}>
                                                <td>4</td>
                                                <td>Prefix used in SI System</td>
                                                <td>
                                                    <span className="btn btn-outline btn-sm">                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg></span>
                                                </td>
                                            </tr>
                                            <tr onClick={() => scrollToSection(section5)}>
                                                <td>5</td>
                                                <td>Acid-Base Indicator Selection</td>
                                                <td>
                                                    <span className="btn btn-outline btn-sm">                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg></span>
                                                </td>
                                            </tr>
                                            <tr onClick={() => scrollToSection(section6)}>
                                                <td>6</td>
                                                <td>Preparation of Standard Solution</td>
                                                <td>
                                                    <span className="btn btn-outline btn-sm">                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg></span>
                                                </td>
                                            </tr>
                                            <tr onClick={() => scrollToSection(section7)}>
                                                <td>7</td>
                                                <td>Concentrations</td>
                                                <td>
                                                    <span className="btn btn-outline btn-sm">                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg></span>
                                                </td>
                                            </tr>
                                            <tr onClick={() => scrollToSection(section8)}>
                                                <td>8</td>
                                                <td>Common Units of Mass &amp; Weight, Length</td>
                                                <td>
                                                    <span className="btn btn-outline btn-sm">                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg></span>
                                                </td>
                                            </tr>
                                            <tr onClick={() => scrollToSection(section9)}>
                                                <td>9</td>
                                                <td>Particle size Conversion</td>
                                                <td>
                                                    <span className="btn btn-outline btn-sm">                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18" height="18"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor" /><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor" /></svg></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container toc_link" ref={section1}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="widget">
                                <h2>Chemistry Websites</h2>
                                <div className="table_wrapper">
                                    <table className="table">
                                        <thead>
                                            <tr className="sticky">
                                                <th>Pharmaceutical Department</th>
                                                <th>Website</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Warner Babcock Institute of Green Chemistry, USA</td>
                                                <td><a href="https://www.warnerbabcock.com" rel="noopener" target="_blank">www.warnerbabcock.com</a></td>
                                            </tr>
                                            <tr>
                                                <td>Center for Green Chemistry &amp; Green Engineering, Yale University, USA</td>
                                                <td><a href="https://greenchemistry.yale.edu" rel="noopener" target="_blank">www.greenchemistry.yale.edu</a></td>
                                            </tr>
                                            <tr>
                                                <td>Green Chemistry Network Center (GCNC)</td>
                                                <td><a href="https://www.gcnc.in" rel="noopener" target="_blank">www.gcnc.in</a></td>
                                            </tr>
                                            <tr>
                                                <td>Canadian Green Chemistry Network</td>
                                                <td><a href="https://www.greenchemistry.ca" rel="noopener" target="_blank">www.greenchemistry.ca</a></td>
                                            </tr>
                                            <tr>
                                                <td>Environmental Chemistry</td>
                                                <td><a href="https://environmentalchemistry.com" rel="noopener" target="_blank">www.environmentalchemistry.com</a></td>
                                            </tr>
                                            <tr>
                                                <td>EPA Green Chemistry Program</td>
                                                <td><a href="https://www.epa.gov/greenchemistry" rel="noopener" target="_blank">www.epa.gov/greenchemistry</a></td>
                                            </tr>
                                            <tr>
                                                <td>American Chemical Society - Green Chemistry Institute</td>
                                                <td><a href="https://www.acs.org" rel="noopener" target="_blank">www.acs.org</a></td>
                                            </tr>
                                            <tr>
                                                <td>Green Chemistry Network</td>
                                                <td><a href="https://www.rsc.org/membership-and-community/degree-accreditation/?404;http://www.rsc.org:80/Membership/Networking/GCN" rel="noopener" target="_blank">www.rsc.org/Membership/Networking/GCN</a></td>
                                            </tr>
                                            <tr>
                                                <td>Greener Education Materials for Chemists</td>
                                                <td><a href="https://www.uoregon.edu" rel="noopener" target="_blank">www.uoregon.edu</a></td>
                                            </tr>
                                            <tr>
                                                <td>Royal Chemical Society, UK</td>
                                                <td><a href="https://www.rsc.org" rel="noopener" target="_blank">www.rsc.org</a></td>
                                            </tr>
                                            <tr>
                                                <td>Department Science &amp; Technology, Govt. of India<br /> (Green Chemistry Task Force)</td>
                                                <td><a href="https://dst.gov.in/about_us/ar04-05chemical.htm" rel="noopener" target="_blank">www.dst.gov.in/about_us/ar04-05chemical.htm</a></td>
                                            </tr>
                                            <tr>
                                                <td>International Green Chemistry World</td>
                                                <td><a href="https://www.industrialgreenchem.com" rel="noopener" target="_blank">www.industrialgreenchem.com</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="container toc_link" ref={section2}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="widget">
                                <h2>Basic SI Units</h2>
                                <div className="table_wrapper">
                                    <table className="table">
                                        <thead>
                                            <tr className="sticky">
                                                <th>Physical Dimension</th>
                                                <th>Symbol for Quantity</th>
                                                <th>SI Symbol</th>
                                                <th>Name of SI Units</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Length</td>
                                                <td>l</td>
                                                <td>m</td>
                                                <td>meter</td>
                                            </tr>
                                            <tr>
                                                <td>Mass</td>
                                                <td>m</td>
                                                <td>kg</td>
                                                <td>kilogram</td>
                                            </tr>
                                            <tr>
                                                <td>Time</td>
                                                <td>t</td>
                                                <td>s</td>
                                                <td>second</td>
                                            </tr>
                                            <tr>
                                                <td>Electric current</td>
                                                <td>I</td>
                                                <td>A</td>
                                                <td>ampere</td>
                                            </tr>
                                            <tr>
                                                <td>Thermodynamic temperature</td>
                                                <td>T</td>
                                                <td>K</td>
                                                <td>Kelvin</td>
                                            </tr>
                                            <tr>
                                                <td>Amount of substance</td>
                                                <td>n</td>
                                                <td>Mole</td>
                                                <td>mole</td>
                                            </tr>
                                            <tr>
                                                <td>Luminous intensity</td>
                                                <td>Iv</td>
                                                <td>cd</td>
                                                <td>candela</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container toc_link" ref={section3}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="widget">
                                <h2>Physical Constants</h2>
                                <div className="table_wrapper">
                                    <table className="table">
                                        <thead>
                                            <tr className="sticky">
                                                <th>Quantity</th>
                                                <th>Symbol</th>
                                                <th>Traditional Units</th>
                                                <th>SI Units</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Acceleration of gravity</td>
                                                <td>g</td>
                                                <td>980.6 cm/s</td>
                                                <td>9.806 m/s</td>
                                            </tr>
                                            <tr>
                                                <td>Atomic mass unit<br />(1/12th of the mass of 12C atom)<br /></td>
                                                <td>amu</td>
                                                <td>1.6606 X 10<sup>-24 </sup>g</td>
                                                <td>1.6606 X 10<sup>-27</sup> kg</td>
                                            </tr>
                                            <tr>
                                                <td>Avogadro constant</td>
                                                <td>N<sub>a</sub></td>
                                                <td>6.022 X 10<sup>23 </sup>particles/mol</td>
                                                <td>6.022 X 10<sup>23 </sup>particles/mol</td>
                                            </tr>
                                            <tr>
                                                <td>Boltzmann constant</td>
                                                <td>k</td>
                                                <td>1.3807 X10<sup>-16</sup> erg/K</td>
                                                <td>1.3807 X 10<sup>-23</sup> J/K </td>
                                            </tr>
                                            <tr>
                                                <td>Charge-to-mass ratio of electron</td>
                                                <td>e/m</td>
                                                <td>1.7588 X 10<sup>8 </sup>Coulomb/g</td>
                                                <td>1.7588 X 10<sup>11</sup> C/kg</td>
                                            </tr>
                                            <tr>
                                                <td>Electronic charge</td>
                                                <td>e</td>
                                                <td>1.60219 X 10<sup>-19</sup> Coulomb 4.8033 X 10<sup>-19</sup> esu</td>
                                                <td>1.60219 X 10<sup>-19</sup> C</td>
                                            </tr>
                                            <tr>
                                                <td>Faraday constant</td>
                                                <td>F</td>
                                                <td>96,487 C·eq<sup>-1</sup></td>
                                                <td>96,487 C·mol<sup>-1</sup></td>
                                            </tr>
                                            <tr>
                                                <td>Gas constant</td>
                                                <td>R</td>
                                                <td>1.987 cal/mol. K </td>
                                                <td>8.3145 kPa dm<sup>3</sup>/ mol .K 8.3145 J/ mol.K</td>
                                            </tr>
                                            <tr>
                                                <td>Molar volume (STP)</td>
                                                <td>V<sub>m</sub></td>
                                                <td>22.710981 L/mol</td>
                                                <td>22.710981 X 10<sup>-3</sup> m<sup>3</sup>/mol<br /> 22.710981 dm<sup>3</sup>/ mol</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container toc_link" ref={section4}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="widget">
                                <h2>Prefix used in SI System</h2>
                                <div className="table_wrapper">
                                    <table className="table">
                                        <thead>
                                            <tr className="sticky">
                                                <th>Multiple</th>
                                                <th>Prefix</th>
                                                <th>Symbol</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>10<sup>-15</sup></td>
                                                <td>Femto</td>
                                                <td>f</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>-12</sup></td>
                                                <td>Pico</td>
                                                <td>p</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>-9</sup></td>
                                                <td>Nano</td>
                                                <td>n</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>-6</sup></td>
                                                <td>Micro</td>
                                                <td>µ</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>-3</sup></td>
                                                <td>Milli</td>
                                                <td>m</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>-2</sup></td>
                                                <td>Centi</td>
                                                <td>c</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>-1</sup></td>
                                                <td>Deci</td>
                                                <td>d</td>
                                            </tr>
                                            <tr>
                                                <td>10</td>
                                                <td>Deca</td>
                                                <td>da</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>2</sup></td>
                                                <td>Hecta</td>
                                                <td>h</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>3</sup></td>
                                                <td>Kilo</td>
                                                <td>k</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>6</sup></td>
                                                <td>Mega</td>
                                                <td>M</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>9</sup></td>
                                                <td>Giga</td>
                                                <td>G</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>12</sup></td>
                                                <td>Tera</td>
                                                <td>T</td>
                                            </tr>
                                            <tr>
                                                <td>10<sup>15</sup></td>
                                                <td>Peta</td>
                                                <td>P</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container toc_link" ref={section5}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="widget">
                                <h2>Acid-Base Indicator Selection</h2>
                                <div className="table_wrapper">
                                    <table className="table">
                                        <thead>
                                            <tr className="sticky">
                                                <th>Name</th>
                                                <th>pH range</th>
                                                <th>Color Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Thymol Blue</td>
                                                <td>1.2-2.8</td>
                                                <td>Red to Yellow</td>
                                            </tr>
                                            <tr>
                                                <td>Bromophenol Blue</td>
                                                <td>3.0-4.6</td>
                                                <td>Yellow to Blue</td>
                                            </tr>
                                            <tr>
                                                <td>Congo Red</td>
                                                <td>3.0-5.0</td>
                                                <td>Blue to Red</td>
                                            </tr>
                                            <tr>
                                                <td>Bromophenol Blue</td>
                                                <td>3.0-4.5</td>
                                                <td>Yellow to Blue</td>
                                            </tr>
                                            <tr>
                                                <td>Methyl Orange</td>
                                                <td>3.2-4.2</td>
                                                <td>Red to Yellow/Orange</td>
                                            </tr>
                                            <tr>
                                                <td>Bromocresol Green</td>
                                                <td>3.8-5.4</td>
                                                <td>Yellow to Blue</td>
                                            </tr>
                                            <tr>
                                                <td>Methyl Red</td>
                                                <td>4.2-6.2</td>
                                                <td>Pink to Yellow</td>
                                            </tr>
                                            <tr>
                                                <td>Methyl Red Hydrochloride</td>
                                                <td>4.2-6.2</td>
                                                <td>Pink to Yellow</td>
                                            </tr>
                                            <tr>
                                                <td>Rosolic Acid</td>
                                                <td>5.0-8.0</td>
                                                <td>Mow to Red</td>
                                            </tr>
                                            <tr>
                                                <td>Bromocresol Purple</td>
                                                <td>5.2-6.8</td>
                                                <td>Yellow to Purple</td>
                                            </tr>
                                            <tr>
                                                <td>Alizarin</td>
                                                <td>5.8-7.2</td>
                                                <td>Yellow to Red</td>
                                            </tr>
                                            <tr>
                                                <td>Bromothymol Blue</td>
                                                <td>6.0-7.6</td>
                                                <td>Yellow to Blue</td>
                                            </tr>
                                            <tr>
                                                <td>m-Nitrophenol</td>
                                                <td>6.8-8.6</td>
                                                <td>Colorless to Yellow</td>
                                            </tr>
                                            <tr>
                                                <td>Phenol Red</td>
                                                <td>6.8-8.2</td>
                                                <td>Yellow to Red</td>
                                            </tr>
                                            <tr>
                                                <td>Cresol Red</td>
                                                <td>7.0-8.8</td>
                                                <td>Yellow to Violet Red</td>
                                            </tr>
                                            <tr>
                                                <td>Thymol Blue</td>
                                                <td>8.0-9.2</td>
                                                <td>Yellow to Blue</td>
                                            </tr>
                                            <tr>
                                                <td>Phenolphthalein</td>
                                                <td>8.0-10.0</td>
                                                <td>Colorless to Red</td>
                                            </tr>
                                            <tr>
                                                <td>Thymolphthalein</td>
                                                <td>8.8-10.5</td>
                                                <td>Colorless to Blue</td>
                                            </tr>
                                            <tr>
                                                <td>Alizarin</td>
                                                <td>1.0-13.0</td>
                                                <td>Red to Purple</td>
                                            </tr>
                                            <tr>
                                                <td>Acid Fuchsin</td>
                                                <td>12.0-14.0</td>
                                                <td>Red to Colorless</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container toc_link" ref={section6}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="widget">
                                <h2>Preparation of Standard Solution</h2>
                                <div className="table_wrapper">
                                    <table className="table">
                                        <thead>
                                            <tr className="sticky">
                                                <td></td>
                                                <th>Specific Gravity (20°C)</th>
                                                <th>Molarity (M)</th>
                                                <th>Qualtity required in ml to make<br /> 1 liter 1 Molar Solution</th>
                                                <th>Normality (N)</th>
                                                <th>Quantity required in ml to make<br />1 liter 1 Normal Solution</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Glacial Acetic acid</td>
                                                <td>1.05</td>
                                                <td>17.4</td>
                                                <td>57.5</td>
                                                <td>17.4</td>
                                                <td>57.5</td>
                                            </tr>
                                            <tr>
                                                <td>Ammonia 30%</td>
                                                <td>0.89</td>
                                                <td>14.5</td>
                                                <td>69</td>
                                                <td>14.5</td>
                                                <td>69</td>
                                            </tr>
                                            <tr>
                                                <td>Ammonia 25%</td>
                                                <td>0.91</td>
                                                <td>13.4</td>
                                                <td>74.6</td>
                                                <td>13.4</td>
                                                <td>74.6</td>
                                            </tr>
                                            <tr>
                                                <td>Hydrochloric acid 36%</td>
                                                <td>1.18</td>
                                                <td>11.7</td>
                                                <td>85.8</td>
                                                <td>11.7</td>
                                                <td>85.8</td>
                                            </tr>
                                            <tr>
                                                <td>Hydrofluoric acid 40%</td>
                                                <td>1.13</td>
                                                <td>22.6</td>
                                                <td>44.2</td>
                                                <td>22.6</td>
                                                <td>44.2</td>
                                            </tr>
                                            <tr>
                                                <td>Hydrofluoric acid 48%</td>
                                                <td>1.15</td>
                                                <td>28.9</td>
                                                <td>34.5</td>
                                                <td>28.9</td>
                                                <td>34.5</td>
                                            </tr>
                                            <tr>
                                                <td>Nitric acid 70%</td>
                                                <td>1.42</td>
                                                <td>15.8</td>
                                                <td>63.3</td>
                                                <td>15.8</td>
                                                <td>63.3</td>
                                            </tr>
                                            <tr>
                                                <td>Perchloric acid 60%</td>
                                                <td>1.54</td>
                                                <td>9.2</td>
                                                <td>108.7</td>
                                                <td>9.2</td>
                                                <td>108.7</td>
                                            </tr>
                                            <tr>
                                                <td>Perchloric acid 70%</td>
                                                <td>1.67</td>
                                                <td>11.6</td>
                                                <td>86.2</td>
                                                <td>11.6</td>
                                                <td>86.2</td>
                                            </tr>
                                            <tr>
                                                <td>Sulphuric acid 98%</td>
                                                <td>1.84</td>
                                                <td>18</td>
                                                <td>53.1</td>
                                                <td>36</td>
                                                <td>26.2</td>
                                            </tr>
                                            <tr>
                                                <td>Phosphoric acid 85%</td>
                                                <td>1.7</td>
                                                <td>15.2</td>
                                                <td>65.8</td>
                                                <td>45.6</td>
                                                <td>21.9</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="container toc_link" ref={section7}>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="widget">
                                <h2>Concentrations</h2>
                                <div className="table_wrapper">
                                    <table className="table">
                                        <thead>
                                            <tr className="sticky">
                                                <th>Percentage (%)</th>
                                                <th>Part per Million (ppm)</th>
                                                <th>Part per Billion (ppb)</th>
                                                <th>Part per Trillion (ppt)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>10,000</td>
                                                <td>10,000,000</td>
                                                <td>10,000,000,000</td>
                                            </tr>
                                            <tr>
                                                <td>0.1</td>
                                                <td>1,000</td>
                                                <td>1,000,000</td>
                                                <td>1,000,000,000</td>
                                            </tr>
                                            <tr>
                                                <td>0.0001</td>
                                                <td>1</td>
                                                <td>1,000</td>
                                                <td>1,000,000</td>
                                            </tr>
                                            <tr>
                                                <td>0.0000001</td>
                                                <td>0.001</td>
                                                <td>1</td>
                                                <td>1,000</td>
                                            </tr>
                                            <tr>
                                                <td>0.0000000001</td>
                                                <td>0.000001</td>
                                                <td>0.001</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>0.0000000000001</td>
                                                <td>0.000000001</td>
                                                <td>0.000001</td>
                                                <td>0.001</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container toc_link" ref={section8}>
                    <div className="d-flex row justify-content-center">
                        <div className="col-md-5">
                            <div className="widget">
                                <h2>Common Units of Mass & Weight</h2>
                                <div className="table_wrapper">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>1 pound = </td>
                                                <td>453.5924 grams </td>
                                                <td>0.45359 kilograms </td>
                                                <td>7000 grains</td>
                                            </tr>
                                            <tr>
                                                <td>1 kilogram  =</td>
                                                <td>1000 grams </td>
                                                <td>2.205 pounds</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>1 gram =</td>
                                                <td>10 decigrams </td>
                                                <td>100 centigrams </td>
                                                <td>1000 milligrams</td>
                                            </tr>
                                            <tr>
                                                <td>1 metric ton =</td>
                                                <td>1000 kilograms</td>
                                                <td>2204.62 pounds</td>
                                                <td>-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5" ref={section9}>
                            <div className="widget">
                                <h2>Common Units of Length</h2>
                                <div className="table_wrapper">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>1 inch =</td>
                                                <td>2.54 centimeters</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>1 mile =</td>
                                                <td>5280 feet </td>
                                                <td>1.609 kilometers </td>
                                                <td>0.3048 meters</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>1 mile =</td>
                                                <td>5280 feet </td>
                                                <td>1.609 kilometers</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>1 yard =</td>
                                                <td>36 inches </td>
                                                <td>0.9144 meter</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>1 meter =</td>
                                                <td>100 centimeters </td>
                                                <td>39.37 inches </td>
                                                <td>3.281 feet </td>
                                                <td>1.094 yards</td>
                                            </tr>
                                            <tr>
                                                <td>1 kilometer =</td>
                                                <td>1000 meter</td>
                                                <td>1094 yards </td>
                                                <td>0.6215 mile</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>1 angstrom =</td>
                                                <td>1.0 X 10-8 centimeter</td>
                                                <td>0.10 nanometer</td>
                                                <td>1.0 X 10-10 meter</td>
                                                <td>-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        </>
    )
}

