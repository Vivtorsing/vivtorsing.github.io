import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

//import images
import VoucherlyIcon from '../images/Voucherly/VoucherlyIcon.png';
import BusinessPage from '../images/Voucherly/BusinessPage.png';
import Customers from '../images/Voucherly/Customers.png';
import Items from '../images/Voucherly/Items.png';
import ViewInvoice from '../images/Voucherly/ViewInvoice.png';

//logo
const logoSrc = VoucherlyIcon;
//images
const featureImages = {
  multipleBusinesses: BusinessPage,
  businessSettings: ViewInvoice,
  quickItems: Items,
  customerManagement: Customers,
};

const Voucherly = () => {
  //logo animation
  const logoVariants = {
    animate: {
      y: [0, -10, 0], //go up and down
      rotate: [0, 5, -5, 0], //slight rotation
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Voucherly - Vivcy Labs</title>
        <meta name="description" content="Voucherly: An invoice app made for small businesses by small businesses. Easy invoicing without subscriptions." />
      </Helmet>
      <div className="max-w-4xl mx-auto py-12">
        {/*logo and app name*/}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <motion.img
            src={logoSrc}
            alt="Voucherly Logo"
            className="w-48 h-48 mx-auto mb-4 shadow-pink-dark"
            variants={logoVariants}
            animate="animate"
          />
          <h1 className="text-4xl font-bold text-pink-accent cute-title">Voucherly</h1>
        </motion.section>

        {/*tagline and desc*/}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-pink-light mb-4">An Invoice App Made For Small Businesses By Small Businesses</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Many small businesses I have talked to are using outdated Quickbooks from the 2010s as they are not willing to pay a Subscription just to create an invoice. So Voucherly is built from the ground up with this in mind to help small businesses easily create invoices!
          </p>
        </section>

        {/*features section*/}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-pink-accent mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card flex flex-col items-center"
            >
              <img src={featureImages.multipleBusinesses} alt="Multiple Businesses" className="w-full h-full mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-pink-light">Multiple Businesses</h3>
              <p>Manage more than one business with separate information, invoices, and settings.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card flex flex-col items-center"
            >
              <img src={featureImages.businessSettings} alt="Lovely Invoices" className="w-full h-full mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-pink-light">Lovely Invoices</h3>
              <p>Create professional invoices like no other.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card flex flex-col items-center"
            >
              <img src={featureImages.quickItems} alt="Quick Items" className="w-full h-full mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-pink-light">Quick Items</h3>
              <p>Save frequently used items so you can add them to invoices in just one click.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card flex flex-col items-center"
            >
              <img src={featureImages.customerManagement} alt="Customer Management" className="w-full h-full mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-pink-light">Customer Management</h3>
              <p>Store customer details and quickly create invoices with auto-filled information.</p>
            </motion.div>
          </div>
        </section>

        {/*smart invoice section*/}
        <section className="mb-12 bg-gray-800 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-pink-accent mb-6">Smart Invoicing</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Create new invoices with ease.</li>
            <li>Duplicate existing invoices for recurring billing.</li>
            <li>Edit invoices anytime.</li>
            <li>Search and find invoices quickly.</li>
          </ul>
        </section>

        {/*tracking section*/}
        <section className="mb-12 bg-gray-800 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-pink-accent mb-6">Tracking & Analytics</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Track invoice status (paid / unpaid).</li>
            <li>See monthly and yearly profit summaries.</li>
          </ul>
        </section>

        {/*link*/}
        <div className="text-center">
          <a href="https://github.com/Vivtorsing/Voucherly" className="btn-pink text-lg px-8 py-3" target="_blank" rel="noopener noreferrer">Get Voucherly Now</a>
        </div>
      </div>
    </>
  );
};

export default Voucherly;