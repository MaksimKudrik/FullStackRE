const typeConfig = {
    "1": {
        title: "Сервопривод большой",
        fields: [
        { key: "speed", label: "Скорость " },
        { key: "voltage", label: "Напряжение " },
        { key: "current", label: "Ток " },
        { key: "speed_sensor", label: "Датчик скорости ", format: (v) => (v ? "Есть" : "Нет") },
        { key: "url_ozon", label: "", isButton: true, buttonText: "Купить" },
        { key: "price", label: "Цена ", unit: ' ₽' },
        ],
    },
    "2": {
        title: "Сервопривод средний",
        fields: [
        { key: "speed", label: "Скорость " },
        { key: "voltage", label: "Напряжение " },
        { key: "current", label: "Ток " },
        { key: "speed_sensor", label: "Датчик скорости ", format: (v) => (v ? "Есть" : "Нет") },
        { key: "url_ozon", label: "", isButton: true, buttonText: "Купить" },
        { key: "price", label: "Цена ", unit: ' ₽' },
        ],
    },
    "3": {
        title: "Цветовые датчики",
        fields: [
        { key: "recognizes_color", label: "Распознавание цвета ", unit: '' },
        { key: "measures_light", label: "Измерение освещённости ", format: v => v ? "Да" : "Нет" },
        { key: "polling_rate_ms", label: "Частота опроса ", unit: "  " },
        { key: "url_ozon", label: "", isButton: true, buttonText: "Купить" },
        { key: "price", label: "Цена ", unit: ' ₽' },
        ]
    },
    "4": {
        title: "Тактильные датчики",
        fields: [
        { key: "touch_mode", label: "Тип нажатия ", unit: '' },
        { key: "force_mode", label: "Сила нажатия ", unit: '' },
        { key: "polling_rate", label: "Частота опроса ", unit: " "  },
        { key: "url_ozon", label: "", isButton: true, buttonText: "Купить" },
        { key: "price", label: "Цена ", unit: ' ₽' },
        ]
    },
    "5": {
        title: "Датчики расстояния",
        fields: [
        { key: "range",       label: "Диапазон ",     unit: " см" },
        { key: "accuracy",    label: "Точность ",     unit: " см" },
        { key: "type",    label: "Тип " },
        { key: "polling_rate", label: "Частота опроса ", unit: " " },
        { key: "url_ozon", label: "", isButton: true, buttonText: "Купить" },
        { key: "price", label: "Цена ", unit: ' ₽' },
        ]
    },
};
export default typeConfig