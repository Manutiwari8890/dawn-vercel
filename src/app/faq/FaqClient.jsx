"use client"

import { useState } from "react";

const faqData = [
  {
    question: "1. How do I place an order?",
    answer: "<p>To place your order, select the item(s) that you wish to purchase and add it to your shopping cart. Then, proceed to the checkout page where you must fill in your personal information and pay for the order. Make sure to double check that you have filled in your details correctly to ensure that you receive all the necessary info and that your order is delivered without any complications.<br /> To get a quote or place an order, please email us at sales@dawnscientific.com. When reaching out, kindly include the details of your request and attach your Purchase Order (PO) to ensure a smooth and efficient process. Our team will respond promptly to provide you with the necessary information and confirm your order.</p>",
  },
  {
    question: "2. How do I inquire about bulk orders?",
    answer: "<p>To place a request for a bulk order, please email us at sales@dawnscientific.com. Once our team receives your request, we will thoroughly review it and for qualifying requests, the bulk sales team can assist you with your request. If we can fulfill your bulk order request, please expect a reply from one of our representatives within 1-3 business days. Due to the high volume of email inquiries, you may not receive a reply if we are unable to fulfill your request. Bulk orders are considered on a case-by-case basis depending on product availability</p>",
  },
  {
    question: "3. How much will I be billed for shipping?",
    answer: "<p>Shipping costs vary depending on a variety of factors, from package measurements, shipment type, weight, shipping location, and value/type/category of content shipped. Once these variables are calculated, a carrier will put a price on your shipment.</p>",
  },
  {
    question: "4. What payment methods are available?",
    answer: "<p>We accept most major credit cards: Mastercard, Visa, Discover Card, American Express and PayPal and Cheques.  If you are issuing a Purchase order (PO) and need billing terms, please contact us directly.</p>",
  },
  {
    question: "5. How do I create a quote?",
    answer: "<p>To request a quote on our Dawn Scientific website, simply click the “Get Quote” button. You will be prompted to enter the Catalogue Number, Product Name, Pack Size, and Quantity desired. Additionally, please provide your personal information and any specific messages or instructions. Once we receive your request, our team will promptly respond with the necessary information.</p>",
  },
  {
    question: "6. Product Label and Symbol Categories?",
    answer: `<p>The Department of Transportation has defined 9 Hazard Class Groups. They are separated by distinct hazardous properties and shipping requirements.</p>
                <ul>
                  <li>Hazard Class 1 – Explosives</li>
                  <li>Hazard Class 2 – Gases</li>
                  <li>Hazard Class 3 – Flammable and Combustible Liquids</li>
                  <li>Hazard Class 4 – Flammable Solids</li>
                  <li>Hazard Class 5 – Oxidizing Substances, Organic Peroxide</li>
                  <li>Hazard Class 6 – Toxic Substances and Infectious Substances</li>
                  <li>Hazard Class 7 – Radioactive Material</li>
                  <li>Hazard Class 8 – Corrosives (Liquids and Solids)</li>
                  <li>Hazard Class 9 – Miscellaneous Hazardous Materials</li>
                </ul>
                <p>
                  <img title="  Dawn Scientific" loading="lazy" src="https://dawnscientific.com/wp-content/uploads/2025/01/Faqs-1-1-scaled.jpg" />
                </p>`,
  },
  {
    question: "7. How do I check for availability?",
    answer: `<p>To view product availability online, your account must be activated for online ordering. With an activated account, you will be able to view product availability for stocked items through the product pages by clicking on Check your availability.</p>
               <p>If a product is Out of Stock or Partially in Stock (limited quantity available). Click on call or emailing us at <a href="mailto:sales@dawnscientific.com">sales@dawnscientific.com</a> .</p>
              `,
  },
  {
    question: "8. Shelf Life of the products/materials?",
    answer: "<p>Some of the chemicals from Dawn Scientific may not have an outdate, simply because those materials should not decompose under normal storage conditions. They should have an indefinite shelf life if they are not contaminated or adulterated. If you are buying a product from Dawn Scientific Company and the product has a known instability, an outdate will be noted on the label. Unless otherwise specified, the outdate will be the last day of the month indicated on the label. Over extended periods of time and/or conditions beyond your direct control could cause degradation of even stable compounds. Storage conditions for all Dawn Scientific chemicals should be room temperature unless otherwise stated on the label.</p>",
  },
  {
    question: "9. What sizes are available?",
    answer: "<p>We offer a wide range of products in various sizes to meet your specific needs. Additionally, we provide custom options to cater to your unique requirements. Whether you need a specific size, a particular configuration, or a tailored solution, our team is dedicated to accommodating your requests to ensure you receive exactly what you need.</p>",
  },
  {
    question: "10. What are consumables for laboratory?",
    answer: "<p>Laboratory Consumables: are equipment that only has limited use, as in it can be used until it is ‘run out’ and then must be disposed of. Some examples of these kinds of materials include pipettes, syringes, beakers, funnels and test tubes. They can also include disposable gloves, and face masks.</p>",
  },
  {
    question: "11. How do I share items with someone?",
    answer: "<p>On the product page, just below the size options, you’ll find a share link. This allows you to easily share the product on Facebook, Twitter, Pinterest, LinkedIn, WhatsApp, or via email.</p>",
  },
  {
    question: "12. Can I track orders that were not placed on dawnscientific.com?",
    answer: "<p>For the order placed offline that via phone, email or other methods, once the order has been placed and accepted you will be notified via email or over the phone with the respective tracking details for the package and other necessary information about the carrier.</p>",
  },
  {
    question: "13. How do I use Live Chat? OR Where is Live Chat available?",
    answer: "<p>Dawn Scientific offers the option to speak directly with our representative to learn more about our products or get information on current promotions and offers. Simply visit our website and click the chat floating button located in the bottom left corner. This will connect you with our team, who are ready to assist you with any questions or needs you may have.</p>",
  },
  {
    question: "14. How quickly will my question be answered?",
    answer: "<p>We are committed to providing prompt responses to your queries or inquiries. When you email us, you can expect a reply within 24 hours. Our dedicated team ensures that all questions and concerns are addressed promptly and thoroughly, helping you get the information you need quickly and efficiently.</p>",
  },
  {
    question: "15. How can you reach one of our team members?",
    answer: "<p>Please feel free to reach out to our dedicated customer care team. You can email us at sales@dawnscientific.com, and for immediate assistance, you can call us at (732) 902-6300 during business hours. Our team is ready to assist you with any inquiries or support you may need.</p>",
  },
  {
    question: "16. What are Dawn Scientific’s business hours?",
    answer: "<p>Our Business Hours are Monday-Friday from 8AM to 5PM EST/EDT</p>",
  },
  {
    question: "17. Why has only part of my order shipped?",
    answer: "<p>Your items may have been shipped in separate packages. This can occur if the items are too large or bulky for a single package, or if your order is being shipped from multiple warehouses. If you need further assistance, please contact us at 1-732-902-6300 or via the chat option available on our website at www.dawnscientific.com. Our team is ready to help with any questions or concerns you may have.</p>",
  },
  {
    question: "18. Can I expedite my order?",
    answer: "<p>Sometimes we cannot expedite any shipping due to the nature of the chemicals, we do have a dedicated customer care team standing by that can assist you in getting your order out the door as quickly as possible.</p>",
  },
  {
    question: "19. I’ve placed my order, what kind of lead time can I expect?",
    answer: `<p>Dawn Scientific takes pride in our ability to ship out our essential chemicals to our over thousands of customers within 24 to 48 hours.</p>
               <p>Oversize freight orders, specialty made to order, and restricted products may take longer to prepare for shipping. These examples can require special packaging and handling as well as additional quality assurance.</p>
              `,
  },
  {
    question: "20. What carrier will be shipping my product to me?",
    answer: "<p>Ground shipments from our main warehouse will be transported by UPS. Orders from our specialty warehouses may be shipped by FedEx. Any orders that require freight shipping will be shipped via freight services. If you are ordering from our website (Dawn Scientific), while checking out, we have created an option for you to choose from FedEx or UPS as your carrier partner/choice.</p>",
  },
  {
    question: "21. Can I use my own FedEx/UPS account to ship my order?",
    answer: `<p>Dawn Scientific is happy to offer our customers this flexibility when it comes to shipping. To use your own shipping account please call our customer care team to place your order.</p>
               <p>Information our customer care team will require:</p>
               <ul>
                <li>Product name/SKU number</li>
                <li>Quantity</li>
                <li>Size of each product</li>
                <li>Shipping address (billing if different)</li>
                <li>Shipping account number</li>
                <li>Payment method</li>
               </ul>
              `,
  },
  {
    question: "22. Can I pick up my product directly from the warehouse?",
    answer: "<p>We do not offer direct pick-up from the warehouse.</p>",
  },
  {
    question: "23. Is my order eligible for returns or a refund?",
    answer: "<p>Unfortunately, due to the nature of our products we are unable to accept returns or issue refunds. If there is a problem with your order or the products that arrived in your shipment, please call our customer care team at 1-732-902-6300 or email us at the following address sales@dawnscientific.com.</p>",
  },
  {
    question: "24. How do I place tax-exempt orders?",
    answer: "<p>If your business is tax-exempt in our state and you’re placing an order with us, please provide certification or proper documentation via email to ap@dawnscientific.com. This will ensure that taxes are not applied to your order total. If we do not receive the necessary documentation, taxes will be added to the order. Thank you!</p>",
  },
  {
    question: "25. What additional fees can I expect?",
    answer: "<p>At Dawn Scientific we strive to keep the cost to our customers as low as possible.  There are some circumstances where additional fees would apply. If a product is specially regulated, whether legally or by our carriers, a “Hazmat Handling Fee” or a “Poison Pack Fee” will be added to your shopping cart. Shipping costs and taxes are not calculated in our displayed product pricing and will be incurred at the time of purchase.</p>",
  },
  {
    question: "26. Does Dawn Scientific offer any kind of Promotions?",
    answer: `<p>We have several ongoing promotions!</p>
               <ol>
                <li>Email Notification Signup</li>
                <li>Bulk Discounting</li>
                <li>Rotating Special Offers, Product Discounts, and Holiday Promos</li>
               </ol>
               <p>Make sure you subscribe to our ongoing email newsletter to stay updated on current promotions.</p>
              `,
  },
  {
    question: "27. Does Dawn Scientific offer samples?",
    answer: "<p>For your convenience, we offer a variety of sizes for numerous products. While we do not offer complimentary samples, we highly recommend purchasing the smallest available size for any testing that you may require.</p>",
  },
  {
    question: "28. Does Dawn Scientific price match?",
    answer: `<p>We strive to preemptively provide the best possible pricing for our customers. However, we are always happy to look at a competitor offering a comparable product at a lower price.  We are committed to earning and keeping your business!</p>
              <p>Please feel free to reach out to our team if you have any questions.</p>
              `,
  },
  {
    question: "29. What does each chemical grade mean?",
    answer: `<table>
                  <tbody>
                  <tr>
                  <td width="108"><strong>Grade</strong></td>
                  <td width="312"><strong>Description</strong></td>
                  <td width="240"><strong>Use</strong></td>
                  </tr>
                  <tr>
                  <td width="108">ACS</td>
                  <td width="312">Meets or exceeds standards set by the American Chemical Society.</td>
                  <td width="240">Food, drug, medicinal use; any application requiring stringent quality specifications</td>
                  </tr>
                  <tr>
                  <td width="108">USP</td>
                  <td width="312">Meets or exceeds standards set by the United States Pharmacopeia</td>
                  <td width="240">Pharmaceutical manufacturing, personal care, medical and first aid</td>
                  </tr>
                  <tr>
                  <td width="108">NF</td>
                  <td width="312">Meets or exceeds standards set by the National Formulary</td>
                  <td width="240">Pharmaceuticals, medical purposes</td>
                  </tr>
                  <tr>
                  <td width="108">HPLC</td>
                  <td width="312">High-purity with physical properties suitable for high performance liquid chromatography.</td>
                  <td width="240">High performance liquid chromatography</td>
                  </tr>
                  <tr>
                  <td width="108">Food</td>
                  <td width="312">Safe to use in or around food.</td>
                  <td width="240">For use in food or to clean surfaces and cookware that will be used with food</td>
                  </tr>
                  <tr>
                  <td width="108">Laboratory</td>
                  <td width="312">Relatively high purity, but exact percentage and nature of impurities is unknown.</td>
                  <td width="240">Educational laboratories</td>
                  </tr>
                  <tr>
                  <td width="108">Technical</td>
                  <td width="312">Have a level of impurity making them unsuitable for high-purity applications but fine for industrial use.</td>
                  <td width="240">Industrial use, commercial manufacturing</td>
                  </tr>
                  <tr>
                  <td width="108">Extraction Grade</td>
                  <td width="312">Suitable as a solvent for medicinal plant, herbal, and botanical extraction processes.</td>
                  <td width="240">Medicinal plant, herbal, botanical extraction processes</td>
                  </tr>
                  <tr>
                  <td width="108">Gradient Grade</td>
                  <td width="312">Suitable for use in HPLC with gradient analysis.</td>
                  <td width="240">HPLC with gradient analysis</td>
                  </tr>
                  </tbody>
                </table>
                `,
  },
  {
    question: "30. Where can I find product certifications/COA/SDS?",
    answer: "<p>Visit our website at www.dawnscientific.com and click on the “SDS and COA” button in the header. Enter the catalogue number to search and access specific product details and relevant certificates.</p>",
  },
  {
    question: "31. How do I dispose of my product?",
    answer: "<p>Each product and city/county/state will have different processes and regulations regarding disposal. We advise you to contact your local waste management expert or facility and consult with them.</p>",
  },
  {
    question: "32. Do you have order minimum?",
    answer: "<p>No, at Dawn Scientific there is no order minimum.</p>",
  },
  {
    question: "33. What accreditations Dawn Scientific has?",
    answer: "<p>Dawn Scientific is 100 % Woman Owned Company certified by WBENC and ISO 9001:2015 company. Dawn Scientific is registered with various associations such as Laboratory Products Association (LPA), Wikitia, ILDA and many more.</p>",
  },
  {
    question: "34. What are all the Products and Materials available at Dawn Scientific?",
    answer: "<p>Dawn Scientific offers a comprehensive platform with over 20,000 products/materials, catering to all your laboratory needs—from chemicals to consumables, instruments, and equipment—all in one place. Explore our diverse range by viewing our Catalogue here to get an overview of the categories and items we carry.</p>",
  },
  {
    question: "35. Why do I have multiple Order Numbers or Packages for my Order?",
    answer: `<ul>
                <li><strong>Multiple Order Numbers: </strong>Depending on the products you ordered and their production times or availability, your order may be split into multiple orders, and they may have different Estimated Delivery Dates. You can view the status of all the order numbers associated with your order by searching your Online Order Support with the Number listed on your Order Confirmation email.</li>
                <li><strong>Multiple Packages: </strong>Depending on the products you ordered, they may require multiple boxes or packages to safely ship your product. Each of these packages will have Tracking Numbers and Carrier Tracking links listed on your Online Order Support.</li>
              </ul>
              `,
  },
  {
    question: "36. Does Dawn Scientific offer discounts for Educational Institutions, Government Offices, Veterans or new start-up laboratories?",
    answer: "<p>Dawn Scientific offers discounts for Educational Institutions, Government Offices, Veterans, and new start-up laboratories. Please contact our sales team or visit our website for more information on eligibility and how to avail of these discounts.</p>",
  },
  {
    question: "37. Does Dawn Scientific produce/manufacture high-purity chemicals in bulk?",
    answer: "<p>Dawn Scientific specializes in the distribution and supply of high-purity chemicals in bulk quantities. We source our products from trusted manufacturers to ensure quality and reliability for various laboratory and industrial applications.</p>",
  },
  {
    question: "38. Storage and Handling?",
    answer: "<p>Proper storage and handling of chemicals and laboratory consumables are crucial for maintaining safety and product integrity. Store chemicals in a cool, dry area with adequate ventilation, adhering to specified temperature requirements when necessary. Ensure all containers are labeled with accurate information, including hazard warnings and receipt dates, and use color-coded labels for easy identification. When handling chemicals, wear appropriate personal protective equipment (PPE) and employ designated tools to prevent cross-contamination. It’s essential to follow established procedures for dispensing and transferring chemicals safely. Be prepared for emergencies by maintaining spill response kits and having emergency contacts and procedures readily accessible. Dispose of chemicals according to local regulations, segregating waste appropriately, and considering recycling options where feasible.</p>",
  },
  {
    question: "39. Does Dawn Scientific make/produce white-label products?",
    answer: "<p>No, Dawn Scientific does not produce or offer white-label products.</p>",
  },
  {
    question: "40. Is it too late to cancel order?",
    answer: `<p>We understand situations arise and orders occasionally need to be canceled.  A cancellation must be processed prior to tracking information being generated. If your order has not been assigned tracking, please call our customer care team immediately to confirm cancellation and stop the shipment.</p>
               <p>Once canceled you will receive an email confirmation from one of our dedicated team members.</p>
              `,
  },
  {
    question: "41. My item is broken or damaged, what should I do?",
    answer: `<p>If you have received your order and find that one or more of your products have arrived damaged, please email our customer care team at sales@dawnscientific.com  immediately.</p>
               <p>In the email, please include the following.</p>
               <ul>
                <li>Pictures of the package’s condition</li>
                <li>Pictures of the damaged product.</li>
                <li>Order number</li>
                <li>Name/SKU of the damaged product</li>
                <li>Any additional details you feel are relevant</li>
               </ul>
               <p>Once we receive your email, a dedicated team member will review the provided information and reach back to you as soon as possible.</p>
              `,
  },
  {
    question: "42. Why is my order shipping by freight carrier?",
    answer: "<p>Your order is likely shipping via freight due to several possible reasons. Freight shipping is typically used for large or heavy items that exceed standard parcel shipping limits, ensuring safe transport for bulky or substantial orders. It may also be chosen for orders with a significant quantity of items or products requiring special handling, such as hazardous materials. Additionally, freight shipping can be more cost-effective for transporting large volumes or heavier items compared to traditional parcel services. If you have specific questions about why your order is shipping via freight, contacting the shipping provider or our customer service team can provide further clarification</p>",
  },
];

export default function FaqClient () {
        const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return <>
      <div className="faq_page">
        <div className="container">
          <ul className="accordion-list">
            {faqData?.map((faq, index) => (
              <li key={index} >
                <h3
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </h3>

                <div className={`faq-answer ${openIndex === index ? "active " : ""}`} dangerouslySetInnerHTML={{ __html: faq?.answer }}></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
};

