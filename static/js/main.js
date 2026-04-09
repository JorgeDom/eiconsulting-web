document.addEventListener('DOMContentLoaded', () => {
    // Idioma por defecto
    let currentLang = 'es';
    let translations = {};

    // Referencias a los botones de cambio de idioma
    const btnEs = document.getElementById('btn-es');
    const btnEn = document.getElementById('btn-en');

    // Función para cargar el archivo JSON correspondiente
    const loadTranslations = async (lang) => {
        try {
            // Utilizamos la ruta relativa desde la raíz del servidor Flask
            const response = await fetch(`/static/i18n/${lang}.json`);
            if (!response.ok) throw new Error('Network response was not ok');
            translations = await response.json();
            applyTranslations();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    };

    // Función para aplicar los textos al DOM
    const applyTranslations = () => {
        // Seleccionamos todos los elementos con el atributo data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            // Navegamos por el objeto JSON usando la clave (ej. 'hero.title' -> hero -> title)
            const keys = key.split('.');
            let value = translations;
            
            for (const k of keys) {
                if (value && value[k]) {
                    value = value[k];
                } else {
                    value = null;
                    break;
                }
            }
            
            if (value) {
                element.textContent = value;
            }
        });
    };

    // Función para manejar el cambio visual de los botones
    const updateActiveButton = (lang) => {
        if (lang === 'es') {
            btnEs.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            btnEn.classList.add('active');
            btnEs.classList.remove('active');
        }
    };

    // Event Listeners para los botones
    btnEs.addEventListener('click', () => {
        if (currentLang !== 'es') {
            currentLang = 'es';
            loadTranslations(currentLang);
            updateActiveButton(currentLang);
        }
    });

    btnEn.addEventListener('click', () => {
        if (currentLang !== 'en') {
            currentLang = 'en';
            loadTranslations(currentLang);
            updateActiveButton(currentLang);
        }
    });

    // Carga inicial del idioma por defecto
    loadTranslations(currentLang);
});