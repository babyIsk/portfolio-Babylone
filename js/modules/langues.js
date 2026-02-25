
const langues = {
    french: {
        "titre-page": "Mon portfolio",
        "sous-titre": "Salut 👋 Je suis Développeuse Web",
        "paragraphe-presentation-rapide": "Je crée des expériences web modernes et performantes."
    },
    english: {
        "titre-page": "My Portfolio",
        "sous-titre": "Hi 👋 I'm a Web Developer",
        "paragraphe-presentation-rapide": "I create modern and high-performance web experiences."
    }
};

export function updateLang(activeLang) {
    var lang = langues[activeLang];
    Object.keys(lang).forEach(cle => {
        const element = document.querySelector('#' + cle);
        element.innerHTML = lang[cle];
    });
}
