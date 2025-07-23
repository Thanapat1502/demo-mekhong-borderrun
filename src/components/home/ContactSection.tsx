import { FiPhone, FiMessageCircle, FiMail } from "react-icons/fi";

export default function ContactSection() {
  return (
    <section className="py-12 px-6 bg-primary-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-white mb-6">Get In Touch</h2>
          <p className="text-primary-200">
            Multiple ways to reach us for your convenience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-accent-400 mb-4 flex justify-center">
              <FiPhone size={24} />
            </div>
            <h3 className="text-white font-medium mb-2">Phone</h3>
            <a
              href="tel:+66951029528"
              className="text-accent-300 hover:text-accent-200 transition-colors">
              +66 95 102 9528
            </a>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-accent-400 mb-4 flex justify-center">
              <FiMessageCircle size={24} />
            </div>
            <h3 className="text-white font-medium mb-2">WhatsApp</h3>
            <a
              href="https://wa.me/66951029528"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-300 hover:text-accent-200 transition-colors">
              +66 95 102 9528
            </a>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-accent-400 mb-4 flex justify-center">
              <FiMessageCircle size={24} />
            </div>
            <h3 className="text-white font-medium mb-2">LINE</h3>
            <a
              href="https://line.me/ti/p/25171107"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-300 hover:text-accent-200 transition-colors">
              ID: 25171107
            </a>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-accent-400 mb-4 flex justify-center">
              <FiMail size={24} />
            </div>
            <h3 className="text-white font-medium mb-2">Email</h3>
            <a
              href="mailto:prpbee711@gmail.com"
              className="text-accent-300 hover:text-accent-200 transition-colors">
              prpbee711@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
