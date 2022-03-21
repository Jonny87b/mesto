// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const jordanImage = new URL("./images/jordan.jpg", import.meta.url);
const jamesImage = new URL("./images/james.jpg", import.meta.url);
const bryantImage = new URL("./images/bryant.jpg", import.meta.url);

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: "Michael Jordan", image: jordanImage },
  { name: "Lebron James", link: jamesImage },
  { name: "Kobe Bryant", link: bryantImage },
];
