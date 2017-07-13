const CUSTOM_UI =  {
  "items" : {
    "color" : "#fff",
    "layout" : "grid"
  },
  "stats" : {
    "order" : {
      "fo" : 1,
      "age" : 2,
      "ine" : 3,
      "cha" : 4
    }
  }
}

const NAMES_TEMPLATE = {
  "fo" : "Fo"
}

const TRADUCTION = {
  "FR" : {
    "contactTitle" : "Contact",
    "home" : "Accueil",
    "contact" : "Contact",
    "skills" : "Compétences",
    "knowledge" : "Connaissances",
    "showcase" : "Travaux",
    "career" : "Parcours"
  },
  "EN" : {
    "contactTitle" : "Contact Us",
    "home" : "Home",
    "contact" : "Contact Us",
    "skills" : "Skills",
    "knowledge" : "Knowledge",
    "showcase" : "Showcases",
    "career" : "Career"
  }
}

const SKILLS = [
  {
     "titre" : "HTML",
     "description" : "L’HyperText Markup Language, généralement abrégé HTML, est le format de données conçu pour représenter les pages web. C’est un langage de balisage permettant d’écrire de l’hypertexte, d’où son nom. HTML permet également de structurer sémantiquement et logiquement et de mettre en forme le contenu des pages.",
     "cat" : ["Langages", "Front", "Web"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 5,
     "utilisation" : 5,
     "logo" : "html.png"
  },
  {
     "titre" : "CSS",
     "description" : "Les feuilles de style en cascade, généralement appelées CSS, forment un langage informatique qui décrit la présentation des documents HTML et XML.",
     "cat" : ["Langages", "Front", "Web"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 5,
     "utilisation" : 5,
     "logo" : "css.png"
  },
  {
     "titre" : "JavaScript",
     "description" : "JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives mais aussi pour les serveurs avec l'utilisation (par exemple) de Node.JS.",
     "cat" : ["Langages", "Back", "Front", "Web", "Script"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 5,
     "utilisation" : 5,
     "logo" : "javascript.png"
  },
  {
     "titre" : "PHP",
     "description" : "PHP: Hypertext Preprocessor4, plus connu sous son sigle PHP, est un langage de programmation libre5, principalement utilisé pour produire des pages Web dynamiques via un serveur HTTP.",
     "cat" : ["Langages", "Back", "Web"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 5,
     "utilisation" : 5,
     "logo" : "php.png"
  },
  {
     "titre" : "AutoIt",
     "description" : "AutoIt 2 est un langage de script permettant de créer des automatisations sous le système d’exploitation Microsoft Windows.",
     "cat" : ["Langages", "Macros", "Script"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 4,
     "utilisation" : 3,
     "logo" : "autoit.png"
  },
  {
     "titre" : "Lua",
     "description" : "Lua est un langage de script libre, réflexif et impératif.",
     "cat" : ["Langages", "Script"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 3.5,
     "utilisation" : 3,
     "logo" : "lua.png"
  },
  {
     "titre" : "SQL",
     "description" : "SQL est un langage informatique normalisé servant à exploiter des bases de données relationnelles. La partie langage de manipulation des données de SQL permet de rechercher, d'ajouter, de modifier ou de supprimer des données dans les bases de données relationnelles.",
     "cat" : ["Langages", "Back", "Base de données", "Web"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 4.5,
     "utilisation" : 5,
     "logo" : "sql.png"
  },
  {
     "titre" : "C/C++",
     "description" : "C++ est un langage de programmation compilé, permettant la programmation sous de multiples paradigmes comme la programmation procédurale, la programmation orientée objet et la programmation générique.",
     "cat" : ["Langages"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 3,
     "utilisation" : 2,
     "logo" : "c++.png"
  },
  {
     "titre" : "Java",
     "description" : "Java est un langage de programmation moderne développé par Sun Microsystems (aujourd'hui racheté par Oracle). Une de ses plus grandes forces est son excellente portabilité : une fois votre programme créé, il fonctionnera automatiquement sous Windows, Mac, Linux, etc.",
     "cat" : ["Langages"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 3,
     "utilisation" : 2,
     "logo" : "java.png"
  },
  {
     "titre" : "XML",
     "description" : "le langage XML est un langage qui permet de décrire des données à l'aide de balises et de règles que l'on peut personnaliser.",
     "cat" : ["Langages", "Web", "Front"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 4,
     "utilisation" : 3,
     "logo" : "xml.png"
  },
  {
     "titre" : "JSON",
     "description" : "JSON est un format léger d'échange de données. Il est facile à lire ou à écrire pour des humains. Il est aisément analysable ou générable par des machines. ",
     "cat" : ["Données", "Front", "Back", "Web"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 5,
     "utilisation" : 5,
     "logo" : "json.png"
  },
  {
     "titre" : "LESS",
     "description" : "LESS étend le CSS avec un comportement dynamique, utilisant des variables, des classes abstraites, des opérations et des fonctions. LESS fonctionne aussi bien côté client que côté serveur, avec Node.js.",
     "cat" : ["Langages", "Front", "Web"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 5,
     "utilisation" : 5,
     "logo" : "less.png"
  },
  {
     "titre" : "jQuery",
     "description" : "jQuery est une bibliothèque JavaScript libre et multi-plateforme créée pour faciliter l'écriture de scripts côté client dans le code HTML des pages web.",
     "cat" : ["Framework", "Front", "Web"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 5,
     "utilisation" : 5,
     "logo" : "json.png"
  },
  {
     "titre" : "AngularJS",
     "description" : "jQuery est une bibliothèque JavaScript libre et multi-plateforme créée pour faciliter l'écriture de scripts côté client dans le code HTML des pages web.",
     "cat" : ["Framework", "Front", "Web"],
     "tags" : "forme html htlm hypertext markup langages html5 web balise site",
     "niveau" : 5,
     "utilisation" : 5,
     "logo" : "json.png"
  }
]
