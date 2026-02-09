export const translations = {
    uk: {
        'franchise.title': 'Ми відкриваємо Foundation Coffee Place для Європи',
        'franchise.top.descr_1.p1': 'Це не просто кав\'ярня — це культура, команда та бренд, який будується серйозно й надовго. У березні ми офіційно представимо франшизу, а зараз збираємо тих, хто хоче бути з нами від самого початку. Залиште заявку — відповімо на всі запитання та обговоримо, як можемо рухатися разом.',
        'franchise.top.descr_1.p2': 'Foundation Coffee Place. Стань частиною початку.',
        'franchise.review.title': 'Стати франчайзі',
        'franchise.review.text': 'Якщо у Вас є побажання, запитання або виникла проблема під час заповнення форми - напишіть нам будь-ласка на пошту info@foundation.ua. Ми будемо раді допомогти!',
        'franchise.review.thanks': 'Дякуємо, незабаром наш менеджер з Вами зв\'яжеться',
        'form.firstName': 'Ім\'я',
        'form.email': 'Email',
        'form.phone': 'Телефон',
        'form.location': 'Країна та місто запуску франшизи',
        'form.budget': 'Бюджет',
        'form.message': 'Ваше повідомлення',
        'franchise.budgetOptions.upTo100k': '€0 - €100,000',
        'franchise.budgetOptions.range100k200k': '€100,000 - €200,000',
        'franchise.budgetOptions.over200k': '€200,000+',
        'franchise.success.title': 'Дякуємо за ваш інтерес!',
        'franchise.success.btn': 'На головну',
        'franchise.send': 'Надіслати',
        'franchise.policy': 'Натискаючи кнопку, ви погоджуєтесь з <a href="/privacy">політикою конфіденційності</a>',
        'contacts.socials.title': 'Слідкуйте за нами в соціальних мережах',
        'errors.required': 'Це поле обов\'язкове',
        'errors.email': 'Введіть коректну email адресу',
        'errors.phone': 'Введіть коректний номер телефону',
        'errors.messageTooLong': 'Повідомлення не може бути довшим за 255 символів'
    },
    en: {
        'franchise.title': 'We are opening Foundation Coffee Place for Europe',
        'franchise.top.descr_1.p1': 'This is not just a coffee shop — it\'s a culture, a team, and a brand built seriously and for the long term. In March, we will officially present the franchise, and now we are gathering those who want to be with us from the very beginning. Leave a request — we will answer all questions and discuss how we can move forward together.',
        'franchise.top.descr_1.p2': 'Foundation Coffee Place. Become part of the beginning.',
        'franchise.review.title': 'Become a Franchisee',
        'franchise.review.text': 'If you have any wishes, questions, or problems while filling out the form - please write to us at info@foundation.ua. We will be happy to help!',
        'franchise.review.thanks': 'Thank you, our manager will contact you soon',
        'form.firstName': 'First Name',
        'form.email': 'Email',
        'form.phone': 'Phone',
        'form.location': 'Country and city of franchise launch',
        'form.budget': 'Budget',
        'form.message': 'Your message',
        'franchise.budgetOptions.upTo100k': '€0 - €100,000',
        'franchise.budgetOptions.range100k200k': '€100,000 - €200,000',
        'franchise.budgetOptions.over200k': '€200,000+',
        'franchise.success.title': 'Thank you for your interest!',
        'franchise.success.btn': 'To Homepage',
        'franchise.send': 'Send',
        'franchise.policy': 'By clicking the button, you agree to the <a href="/privacy">privacy policy</a>',
        'contacts.socials.title': 'Follow us on social media',
        'errors.required': 'This field is required',
        'errors.email': 'Please enter a valid email address',
        'errors.phone': 'Please enter a valid phone number',
        'errors.messageTooLong': 'Message cannot be longer than 255 characters'
    }
};

export function getTranslation(key, lang) {
    return translations[lang]?.[key] || key;
}

export function isLanguageSupported(lang) {
    return lang in translations;
}