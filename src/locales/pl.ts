export default {
  cta: {
    call: 'ZADZWOŃ',
  },

  intro: {
    carousel: {
      main: {
        title: 'USŁUGI SPRZĄTANIA ',
        subtitle:
          'Zapewniamy naszym Klientom wysokiej jakości kompleksowe usługi sprzątające.',
      },
      imgDescription: {
        basic:
          'Sprzątanie domu, pokoju i jego wyposażenia, sprzątanie dokładne i całkowite.',
        window:
          'Czyścimy okna, witryny, fasady szklane i framugi; sezonowe mycie okien oraz na żądanie, mycie okien po remoncie.',
        office:
          'Celem sprzątania biur jest utrzymanie czystego i zdrowego środowiska pracy. Sprzątanie biur obejmuje czyszczenie powierzchni odkurzaczem, odpylanie i dezynfekcja.',
        house:
          'Sprzątanie balkonów, klatek schodowych - pozostałości po złej pogodzie, nagromadzony kurz, pajęczyny oraz ptasie odchody.',
      },
    },
  },

  calc: {
    title: 'Wstępna kalkulacja kosztów sprzątania',
    description:
      'Kalkulator wylicza przybliżone ceny. W celu dokładnej kalkulacji zadzwoń do nas {number} lub wyślij zdjęcie/film {email}',
    subtitle: {
      service: 'Wybierz usługę',
      cleaning: 'Wybierz rodzaj czyszczenia',
      room: 'Wybierz rodzaj pomieszczenia',
      additional: 'Wybierz inne usługi ',
    },
    order: {
      title: 'Zamówienie',
      subtitle:
        'Sprzątanie mieszkania składające z 1 pokoju i 1 łazienki , kuchni i przedpokoju',
      square: 'Obszar pomieszczenia',
      office: 'Sprzątanie biura',
      empty: '@:service.room.empty',
      withFurniture: '@:service.room.withFurniture',
      service: 'Rodzaj usługi',
      cleaning: 'Rodzaj czyszczenia',
      room: 'Rodzaj pomieszczenia',
      additional: 'Inne usługi',
      price: 'Cena',
      sum: {
        title: 'Razem',
        from: 'od',
      },
      info: 'Ceny mają charakter orientacyjny i mogą odbiegać od rzeczywistych kosztów sprzątania',
    },
  },

  service: {
    building: {
      condo: 'Sprzątanie mieszkania',
      afterRepair: 'Sprzątanie po remoncie',
      office: 'Sprzątanie biura',
    },
    cleaning: {
      basic: 'Podstawowe',
      accurate: 'Dokładne',
    },
    room: {
      bathroom: 'Łazienka',
      room: 'Pokój',
      kitchen: 'Kuchnia',
      empty: 'Puste pomieszczenie',
      withFurniture: 'Pomieszczenie z meblami',
    },
    additionalService: {
      windowCleaning: 'mycie okien',
      ovenCleaning: 'piekarnik',
      kitchenCabinetCleaning: 'mycie szafek kuchennych',
      balconyCleaning: 'mycie balkonów',
      refrigeratorCleaning: 'lodówka',
      radiatorCleaning: 'cyszczenie kaloryferów',
      coffeeMachineCleaning: 'mycie ekspresu',
      dishwasherCleaning: 'mycie zmywarki',
      kitchenHoodCleaning: 'mycie okapu',
      dishesCleaning: 'mycie naczyń',
      microwaveCleaning: 'mikrofalówka',
      ironing: 'prasowanie',
    },
  },

  cleaning: {
    title: 'Jak sprzątamy?',
    description:
      'Sprzątaczka przybywa na umówioną godzinę ze wszystkim co niezbędne i od razu zabiera się do pracy. Jedyne co musisz zrobić to ocenić wynik.',
    categories: ['POKÓJ', 'KUCHNIA', 'ŁAZIENKA', 'BIURO', 'OKNA', 'INNE'],
    services: {
      header: {
        basic: 'PODSTAWOWE SPRZĄTANIE',
        accurate: 'DOKŁADNE SPRZĄTANIE',
      },

      room: {
        basic: [
          {
            title: 'Wytarcie kurzu z powierzchni łatwo dostępnych',
            subtitle:
              'półki, ramki do zdjęć, gniazdka i wyłączniki, parapety, sprzęt RTV, meble.',
          },
          { title: 'Odkurzenie i umycie podłogi.' },
          { title: 'Umycie luster.' },
        ],
        accurate: [
          {
            title: 'Wytarcie kurzu z powierzchni',
            subtitle:
              'półki, ramki do zdjęć, gniazdka i wyłączniki, parapety, sprzęt RTV, meble, drzwi, futryny, lampy, kratki wentylacyjne, pod łóżkiem, na szafkach.',
          },
          { title: 'Odkurzenie i umycie podłogi.' },
          { title: 'Umycie luster.' },
          { title: 'Złożenie rzeczy leżących na wierzchu.' },
          { title: 'Zmiana pościeli.' },
        ],
      },

      kitchen: {
        basic: [
          {
            title: 'Wytarcie kurzu z powierzchni łatwo dostępnych',
            subtitle:
              'umycie blatów kuchennych, umycie sprzętów AGD z zewnątrz.',
          },
          { title: 'Odkurzenie i umycie podłogi.' },
          { title: 'Opróżnienie kosza na śmieci/wymiana worka na śmieci.' },
          { title: 'Umycie lub wstawienie brudnych naczyń do zmywarki.' },
          { title: 'Wyniesienie śmieci.' },
        ],
        accurate: [
          {
            title: 'Wytarcie kurzu z powierzchni',
            subtitle:
              'umycie blatów kuchennych, umycie sprzętów AGD z zewnątrz i wewnątrz.',
          },
          { title: 'Odkurzenie i umycie podłogi.' },
          { title: 'Opróżnienie kosza na śmieci/wymiana worka na śmieci.' },
          { title: 'Umycie lub wstawienie brudnych naczyń do zmywarki.' },
          { title: 'Wyniesienie śmieci.' },
          { title: 'Wytarcie opraw oświetleniowych.' },
          { title: 'Wytarcie obudowy okapu.' },
          { title: 'Wytarcie szafek wewnątrz.' },
        ],
      },

      bathroom: {
        basic: [
          { title: 'Wytarcie kurzu z powierzchni łatwo dostępnych.' },
          { title: 'Staranne rozwieszenie ręczników.' },
          { title: 'Opróżnienie kosza na śmieci.' },
          { title: 'Odkurzenie i umycie podłogi.' },
          { title: 'Umycie kubka na szczoteczki.' },
          { title: 'Umycie luster.' },
          {
            title:
              'Umycie i dezynfekcja sanitariatów, kabiny prysznicowej/wanny, umywalki.',
          },
        ],
        accurate: [
          { title: 'Wytarcie kurzu z powierzchni oraz z pólłek.' },
          { title: 'Staranne rozwieszenie ręczników.' },
          { title: 'Opróżnienie kosza na śmieci.' },
          { title: 'Odkurzenie i umycie podłogi.' },
          { title: 'Umycie kubka na szczoteczki.' },
          { title: 'Umycie luster.' },
          {
            title:
              'Umycie i dezynfekcja sanitariatów, kabiny prysznicowej/wanny, umywalki.',
          },
          {
            title: 'Wytarcie opraw oświetleniowych.',
          },
          {
            title: 'Umycie glazury oraz fug, kaloryfera.',
          },
          {
            title: 'Układanie na miejsce kosmetyków.',
          },
        ],
      },

      office: {
        basic: [
          { title: 'Odkurzenie i umycie podłogi.' },
          { title: 'Wycieranie parapetów, biurek.' },
          { title: 'Mycie armatury łazienkowej.' },
          { title: 'Mycie kabiny prysznicowej, wanny.' },
          { title: 'Opróżnianie koszy na śmieci, wymiana worków.' },
          { title: 'Umycie luster oraz przeszkleń.' },
          { title: 'Wstawienie brudnych naczyń do zmywarki.' },
          { title: 'Wstawienie brudnych naczyń do zmywarki.' },
          { title: 'Mycie drzwi szklanych, dezynfekcja klamek.' },
          { title: 'Uzupełnianie środków higienicznych.' },
          { title: 'Mycie okien.' },
        ],
      },

      windows: {
        basic: [
          { title: 'Okno jednoskrzydłowe' },
          { title: 'Okno dwuchskrzydłowe standartowe' },
          { title: 'Drzwi balkonowe jednoskrzydłowe' },
          { title: 'Drzwi balkonowew dwuchskrzydłowe' },
          { title: 'Okno dachowe' },
          { title: 'Okna niestandartowe – wycena indywidualna' },
        ],
      },

      other: {
        balcony: 'sprzątanie balkonu',
        afterRepair: 'sprzątanie po remoncie',
        stairs: 'sprzątanie kliatek schodowych, domków letniskowych i domów',
      },
    },
  },
};
