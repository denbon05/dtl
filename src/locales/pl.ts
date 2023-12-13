export default {
  cta: {
    call: 'ZADZWOŃ',
    consult: 'Uzyskać konsultację',
  },

  main: {
    desc: 'DTL serwis sprzątający',
    localization:
      'Pracujemy na terenie Bielska-Białej oraz w promieniu 20 km od miasta',
  },

  appBar: {
    calc: 'KALKULATOR',
    cleaning: 'CZYSZCZENIE TO...',
    order: 'ZAMÓWIENIE',
    price: 'CENA',
    faq: 'PYTANIA I ODPOWIEDZI',
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
      basic: {
        title: 'Podstawowe',
        tip: 'Sprzątanie mieszkania składającego się z 1 pokoju i 1 łazienki , kuchni i korytarza',
      },
      accurate: {
        title: 'Dokładne',
        tip: 'To gruntowne i dokładne sprzątanie całego mieszkania czy domu, wymaga dużo czasu i wysiłku, ale pozwala na uzyskanie czystego i schludnego domu',
      },
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

  price: {
    title: 'Nasze ceny',
    desc: 'Oferujemy usługi w zakresie sprzątania i czyszczenia jednorazowego , cyklicznego jak i długoterminowego.',
    helpers: {
      from: 'od',
      item: 'szt',
    },
  },

  order: {
    steps: {
      title: 'Etapy zamówienia ',
      phone: {
        title: 'Twój telefon do nas',
        desc: 'Skontaktuj się z nami w wygodny sposób. Menedżer telefonicznie lub korespondencyjnie omawia wszystkie szczegóły Twojego zamówienia i ustala z Tobą dogodny termin i godzinę sprzątania',
      },
      day: {
        title: 'Dzień X',
        desc: 'O wyznaczonej godzinie na miejsce przyjeżdża ekipa sprzątająca wraz ze sprzętem. Nie musisz się przygotowywać! Jedyne czego potrzebujemy to dostęp do wody i prądu.',
      },
      result: {
        title: 'Uzyskanie wyniku',
        desc: 'Godzinę po zakończeniu dzwoni do ciebie brygadzista. Wracasz do domu i nie poznajesz swojego domu. Razem z brygadzistą akceptujesz pracę i jesteś zadowolony z efektu!',
      },
    },
  },

  tips: {
    title: 'Wskazówka dotycząca czyszczenia',
    caption:
      'Czystość i porządek w mieszkaniu same potrafią poprawić nastrój. Dlatego utrzymanie porządku jest bardzo ważne nie tylko ze względów higienicznych, ale także dla pozytywnego stanu ducha. Przestrzegając prostych zasad sprzątania, bez nadmiernego wysiłku utrzymasz mieszkanie w czystości',
    desc: 'Wybierz wiadro lub kosz, w którym będą znajdować się narzędzia i detergenty potrzebne do mycia. Dzięki temu wszystko, co potrzebne w pracy, będziesz mieć pod ręką, zamiast biegać za każdym razem po szmatę, myjkę itp.',
    cleaningSteps: [
      'Przejrzyj rzeczy w szafach i wyrzuć wszystko, czego nie potrzebujesz. Często niektóre rzeczy leżą na półce latami, zajmując miejsce. Jeśli od dłuższego czasu nie nosisz jakichś ubrań lub butów, albo niektórych rzeczy nie używasz, wyrzuć je bez żalu.',
      'Podziel proces sprzątania na kilka etapów. Nie powinieneś próbować robić wszystkiego na raz, aby się nie zmęczyć. Na przykład jednego dnia możesz posortować rzeczy w szafie, a innego dnia posprzątać łazienkę itp. Pracę ciężką zamieniaj na lekką.',
      'Nie odkładaj na długo plam do czyszczenia lub prania mocno zabrudzonych rzeczy. Im więcej czasu mija, tym trudniej jest usunąć plamy i zabrudzenia.',
      'Zanim zaczniesz czyścić plamy na tapicerce czy dywanach, dowiedz się, jakim środkiem to zrobić, aby nie zepsuć rzeczy. Jeśli to możliwe, określ skład tkaniny i dobierz odpowiedni środek czyszczący.',
      'Przede wszystkim wykonują czyszczenie chemiczne, a następnie rozpoczynają pranie. Oznacza to, że najpierw usuwają pajęczyny, zamiatają kurz, a następnie myją szafki i podłogę.',
      'Wszystkie prace są wykonywane od góry do dołu. Zaczynają od sprzątania górnych szafek, abażurów na suficie, a kończą na umyciu podłogi.',
    ],
  },

  partner: {
    title: 'Nasz partner',
  },
};
