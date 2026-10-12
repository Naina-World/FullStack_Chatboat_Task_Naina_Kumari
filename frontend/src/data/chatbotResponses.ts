
export const suggestedQuestions = [
  "What services does DroneTV provide?",
  "What courses / training are available?",
  "How can I contact DroneTV?",
  "How can I register?",
  "I am interested in a service.",
  "I am a student.",
  "I want to speak with someone.",
];

export function getBotResponse(message: string): string {
  const text = message
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");

  if (!text) {
    return "Please type a question or select one of the suggested questions.";
  }

  // Greetings
  if (/^(hi+|hello+|hey+|hii+|hiii+)$/.test(text)) {
    return "Hello! 👋 Welcome to DroneTV Support. I can help you with services, courses, registration, and enquiries. How can I assist you today?";
  }

  // 1. Services
  if (
    /\b(services?|mapping|inspection|monitoring|aerial photography)\b/.test(text) ||
    /\bwhat do you offer\b/.test(text) ||
    /\bwhat does dronetv provide\b/.test(text)
  ) {
    return "Drone technology can be used for applications such as aerial mapping, inspection, monitoring, and photography. Please visit our Services page or submit an enquiry to confirm which services DroneTV currently provides. What service are you interested in?";
  }

  // 2. Courses and training
  if (
    /\b(courses?|training|student|students|learning|learn|pilot|syllabus)\b/.test(text) ||
    /\bwhat.*(course|training).*(available|offer)\b/.test(text)
  ) {
    return "Interested in courses or training? 📚 Please explore our Courses page and contact the team to confirm currently available programmes, eligibility, fees, schedules, and certification details.";
  }

  // 3 and 7. Contact and human support
  if (
    /\b(contact|phone|telephone|email|address|human|someone|team|speak|talk|support|representative|agent)\b/.test(text) ||
    /\bget in touch\b/.test(text)
  ) {
    return "You can contact the IPAGE Group team at info@ipageums.com or +91 8804349999. You can also visit https://ipageums.com/contact-us/ or submit an enquiry through our Contact page.";
  }

  // 4. Registration
  if (
    /\b(register|registration|signup|enroll|enrol|admission|apply|application)\b/.test(text) ||
    /\bhow do i join\b/.test(text)
  ) {
    return "To register your interest, visit our Contact page and complete the enquiry form with your name, email, phone number, user type, area of interest, and message. The team can confirm the next steps.";
  }

  // 5. Interested in a service
  if (
    /\b(interested|enquiry|enquiries|inquiry|inquiries|requirement|requirements|customer|client)\b/.test(text) ||
    /\bneed a drone\b/.test(text)
  ) {
    return "Thank you for your interest! Please visit our Contact page and submit the enquiry form. Describe your requirements and select the relevant area of interest so the team can review your request.";
  }

  // Pricing questions
  if (/\b(price|pricing|cost|fee|fees|charges)\b/.test(text) || /\bhow much\b/.test(text)) {
    return "Prices may vary by service or training programme. I don't have verified current pricing, so please contact the team or submit an enquiry for accurate information.";
  }

  // Thanks and goodbye
  if (/\b(thanks|thank|thankyou|appreciate)\b/.test(text)) {
    return "You're welcome! 😊 Feel free to ask another question or submit an enquiry if you need further assistance.";
  }

  if (/\b(bye|goodbye|take care)\b/.test(text)) {
    return "Thank you for visiting DroneTV Support. 👋 Have a great day!";
  }

  // Unknown questions
  return "I'm sorry, I don't have a predefined answer for that question yet. You can ask about DroneTV services, courses and training, registration, or contact details. You can also submit an enquiry through our Contact page for further assistance.";
}

