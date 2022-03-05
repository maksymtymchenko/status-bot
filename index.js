const TelegramBot = require('node-telegram-bot-api');

const token = '5259176417:AAGXaRb__3wl_PjQnlmTO2vLa7IevYpnBBc';

const bot = new TelegramBot(token, {polling: true});

bot.setMyCommands([
    {command: '/info', description: 'Раз в декілька годин я буду запитувати ваш статус.'},
    {command: '/status', description: 'Напиши як ти і де ти.'}
])

const statusOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Я в безпеці', callback_data: 'save'}],
            [{text: 'Бахкає, але я норм', callback_data: 'almostSave'}],
            [{text: 'Я в небезпеці', callback_data: 'dangerous'}]
        ]
    })
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    setInterval(() => {
        return bot.sendMessage(chatId, 'Настав час переклички, для цього відправ команду /status в чат');
    }, 7200000)


    if (msg.text === '/start') {
        return bot.sendMessage(chatId, 'Для того, щоб відправити свій статус напиши /status');
    }

    if (msg.text === '/info') {
        return bot.sendMessage(chatId, 'Раз в декілька годин я буду запитувати ваш статус.');
    }

    if (msg.text === '/status') {
        bot.on('callback_query', msg => {
            const myChatId = 427117577
            const data = msg.data;

            if (data === 'save') {
                bot.sendMessage(myChatId, `@${msg.from.username} в безпеці!!`)
                return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp');
            }

            if (data === 'almostSave') {
                bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/16.webp');
                return bot.sendMessage(chatId, 'Зберігай спокій, скоро все закінчиться.')
            }

            if (data === 'dangerous') {
                bot.sendMessage(myChatId, `@${msg.from.username} в небезпеці!!`)
                return bot.sendMessage(chatId, 'Тут ти можеш знайти багато корисної інформації, яка може тобі допомогти - https://docs.google.com/document/d/1-RwvHu8nbAcTeLoARwZ9QJ4c8FaK2WErorWeAP62BL4/mobilebasic')
            }
        })

        return bot.sendMessage(chatId, 'Вибери свій статус.', statusOptions);
    }
});
