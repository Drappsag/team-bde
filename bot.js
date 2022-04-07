const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const wait = require('util').promisify(setTimeout);
const { Client, Intents, Interaction, Message, Permissions, Collection } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS
    ]
});
const warn = require("./warn.json");
//const ticket = require("./ticket.json");
const { config } = require("process");
const TwitchAPI = require("node-twitch").default

/*const Streaming = require("discord-streaming");

Streaming(client, {
	live :  "EN LIVE",
	required : "Crew" // optional parameter, only use if you want to take action on people of a specific role
});*/

const warnchn = "959208699417747466"
const banchn = "959208606945923132"
const joinchn = "959208479179034665"
const ticketslogs = "959208198114521109"
const logs = "958831725457342494"
const cmd = "959207509036503050"

function Savewarn() {
    fs.writeFile("./warn.json", JSON.stringify(warn, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue dans l'écriture de la basse de donnée !");
    });
}


//COMMANDE ME
const me = new SlashCommandBuilder()
    .setName("me")
    .setDescription("Faire parler le bot. STAFF ONLY")
    .addStringOption(option => option
        .setName("texte")
        .setDescription("Texte à répéter")
        .setRequired(true));

//COMMANDE EMBED
const embed = new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Faire parler le bot via message embed. STAFF ONLY")
    .addStringOption(option => option
        .setName("titre")
        .setDescription("Titre de l'embed")
        .setRequired(true))
    .addStringOption(option => option
        .setName("description")
        .setDescription("Descrition de l'embed")
        .setRequired(true))
    .addStringOption(option => option
        .setName("couleur")
        .setDescription("Définit la couleur de l'embed")
        .setRequired(true)
        .addChoice("Rouge", "#FF0000")
        .addChoice("Vert", "#00FF00")
        .addChoice("Bleu", "#0000FF")
        .addChoice("Violet", "#AC1BD3")
        .addChoice("Cyan", "#00E8FF")
        .addChoice("Jaune", "#FBFF00")
        .addChoice("Orange", "#E88608"))
    .addStringOption(option => option
        .setName("image")
        .setDescription("Liens de l'image à afficher en TRES grand (Attention c vrmt grand)")
        .setRequired(false)
        .addChoice("logo serv", "https://i.imgur.com/9kd0cCd.png"))
    .addStringOption(option => option
        .setName("thumbnail")
        .setDescription("Liens de l'image en petit à droite")
        .setRequired(false)
        .addChoice("logo serv", "https://i.imgur.com/9kd0cCd.png"));

//COMMAND WARN
const cmdwarn = new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Avertir un utilisateur. STAFF ONLY")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("Utilisateur à avertir")
        .setRequired(true))
    .addStringOption(option => option
        .setName("raison")
        .setDescription("Indiquer la raison de l'avertissement")
        .setRequired(true))

//COMMAND UNWARN
const cmdunwarn = new SlashCommandBuilder()
    .setName("unwarn")
    .setDescription("Supprimer les avertissements d'un utilisateur. STAFF ONLY")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("Utilisateur auquel supprimer les avertissements")
        .setRequired(true))

//COMMAND CHECKWARN
const cmdcheckwarn = new SlashCommandBuilder()
    .setName("checkwarn")
    .setDescription("Voir les avertissements d'un utilisateur.")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("Utilisateur pour lequel afficher les warns")
        .setRequired(true))

//CLEAR
const clear = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Supprimer des messages en masse. STAFF ONLY")
    .addNumberOption(option => option
        .setName("nombre")
        .setDescription("Indiquez le nombre de message à supprimer")
        .setRequired(true))
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("Supprime uniquement les messages de cet utilisateur")
        .setRequired(false))

//MUTE
const mute = new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Rendre muet un utilisateur pendant un certain temps. STAFF ONLY")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("Utilisateur à rendre muet")
        .setRequired(true))
    .addStringOption(option => option
        .setName("raison")
        .setDescription("Indiquez la raison pour laquelle vous rendez muet cet utilisateur")
        .setRequired(true))
    .addStringOption(option => option
        .setName("temps")
        .setDescription("Durée du mute de l'utilisateur (en seconde)")
        .setRequired(true)
        .addChoice("5 minutes", "300")
        .addChoice("10 minutes", "600")
        .addChoice("15 minutes", "900")
        .addChoice("30 minutes", "1800")
        .addChoice("1 heure", "3600"))

//UNMUTE
const unmute = new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Rétablir la parole à un utilisateur. STAFF ONLY")
    .addUserOption(o => o
        .setName("utilisateur")
        .setDescription("Utilisateur à démute")
        .setRequired(true))

const ban = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bannir un utilisateur. STAFF ONLY")
    .addUserOption(o => o
        .setName("utilisateur")
        .setDescription("Utilisateur à bannir")
        .setRequired(true))
    .addStringOption(o => o
        .setName("raison")
        .setDescription("Raison du bannissement")
        .setRequired(true))

const kick = new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Expulser un utilisateur. STAFF ONLY")
    .addUserOption(o => o
        .setName("utilisateur")
        .setDescription("Utilisateur à expulser")
        .setRequired(true))
    .addStringOption(o => o
        .setName("raison")
        .setDescription("Raison de l'expulsion")
        .setRequired(true))

//ANTI SPAM :
const AntiSpam = require("discord-anti-spam");
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
    kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: "{@user}, Merci d'arrêter de spam.", // Message that will be sent in chat upon warning a user.
    kickMessage: "**{user_tag}** vient d'être kick pour spam.", // Message that will be sent in chat upon kicking a user.
    muteMessage: "**{user_tag}** vient d'être mute pour spam.", // Message that will be sent in chat upon muting a user.
    banMessage: "**{user_tag}** vient d'être banni pour spam.", // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 6, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
    ignoredPermissions: ["ADMINISTRATOR"], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredMembers: [], // Array of User IDs that get ignored.
    unMuteTime:  5, // Amount of time (in minutes) a user will be muted for.
    removeMessages: true, // If the bot should remove all the spam messages when taking action on a user!
    modLogsEnabled: true, // If to enable modlogs
    modLogsChannelName: "mute-ban-kick-logs", // channel to send the modlogs too!
    modLogsMode: "embed",
    // And many more options... See the documentation.
});

client.on("messageCreate", (message) => antiSpam.message(message));




client.once("ready", async () => {
    //statut qui change
    const statut = [
        "twitch.tv/habibcrr",
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statut[i], {type: "STREAMING", url: "https://www.twitch.tv/habibcrr"})
        i = ++i % statut.length
    }, 5000)
    //COMMAND SLASH
    //TOUT SUPPRIMER
    /*await client.guilds.cache.get("813308693529362463").commands.fetch();
    client.guilds.cache.get("813308693529362463").commands.cache.map(command => {
        command.delete();
    });*/

    //CREATION DES COMMANDES
    //client.guilds.cache.get("813308693529362463").commands.create(me);
    //client.guilds.cache.get("813308693529362463").commands.create(embed);
    //client.guilds.cache.get("813308693529362463").commands.create(cmdwarn);
    //client.guilds.cache.get("813308693529362463").commands.create(cmdunwarn);
    //client.guilds.cache.get("813308693529362463").commands.create(cmdcheckwarn);
    //client.guilds.cache.get("813308693529362463").commands.create(clear);
    //client.guilds.cache.get("813308693529362463").commands.create(mute);
    //client.guilds.cache.get("813308693529362463").commands.create(unmute);
    //client.guilds.cache.get("813308693529362463").commands.create(ban);
    //client.guilds.cache.get("813308693529362463").commands.create(kick);

    console.log("BDE BOT PRÊT");
});

client.on("messageCreate", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;


    //AUTO REACTION
    if(message.channel.id === "959134077259247736"){
        message.react("❤️");
    }

    let bonjour = ["bonjour","salut","hello","hey","bonsoir",]
    let foundbonjour = false;

    for(var i in bonjour) {
        if(message.content.toLocaleLowerCase().includes(bonjour[i].toLowerCase())) foundbonjour = true;
    }
    
    if(foundbonjour) {
        message.react("👋");
    }

    if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        //RESEAUX
        if(message.content === "!reseaux"){
            let row = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setLabel("Twitch")
                    .setEmoji('959215418638237697')
                    .setStyle("LINK")
                    .setURL("https://www.twitch.tv/habibcrr"))
                .addComponents(new Discord.MessageButton()
                    .setLabel("YouTube")
                    .setEmoji('959214659985104946')
                    .setStyle("LINK")
                    .setURL("https://www.youtube.com/channel/UCCMgZZAHYvMlpMJCxzmzfjQ"))
                .addComponents(new Discord.MessageButton()
                    .setLabel("Instagram")
                    .setEmoji('959214661427920996')
                    .setStyle("LINK")
                    .setURL("https://www.instagram.com/boldy_esport/?hl=fr"));
            let row2 = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setLabel("Twitter")
                    .setEmoji('959214660429705216')
                    .setStyle("LINK")
                    .setURL("https://twitter.com/BDE_Team"))
                .addComponents(new Discord.MessageButton()
                    .setLabel("TikTok")
                    .setEmoji('959214776658034709')
                    .setStyle("LINK")
                    .setURL("https://www.tiktok.com/@team_bde"))
                .addComponents(new Discord.MessageButton()
                    .setLabel("Discord")
                    .setEmoji('959214660681338930')
                    .setStyle("LINK")
                    .setURL("https://discord.gg/R5uTB9bF"));

            message.channel.send({ content: "https://i.ibb.co/hD5g9D0/Discord-Reseaux.png", components: [row]});
            message.channel.send({ content: "ㅤ", components: [row2]});
        }

        //AIDEMODERATION
        if(message.content === "!aidemodo"){
            message.delete();
            var embedhelp = new Discord.MessageEmbed()
                .setColor("#5E9FFF")
                .setTitle("Aide Modération")
                .setDescription("Voici toutes les commandes de modérations, il suffit de tapper : **/** puis le nom de la commande ! Il suffit de lire, tout est décrit !")
                .setThumbnail("https://i.imgur.com/9kd0cCd.png")
                .addFields(
                    { name: "Avertir :", value: "/warn", inline: false},
                    { name: "Voir les avertissements :", value: "/checkwarn", inline: false},
                    { name: "Supprimer les avertissements :", value: "/unwarn", inline: false},
                    { name: "Rendre muet :", value: "/mute", inline: false},
                    { name: "Rétablir la voix :", value: "/unmute", inline: false},
                    { name: "Expulser un membre :", value: "/kick", inline: false},
                    { name: "Bannir un membre :", value: "/ban", inline: false},
                    { name: "Effacer messages en masse :", value: "/clear", inline: false},
                    { name: "Faire parler le bot :", value: "/me", inline: false},
                    { name: "Faire parler le bot (embed) :", value: "/embed", inline: false},
                )
                .setFooter({text: "Dev par Drapsag", iconURL: "https://i.imgur.com/zEodTVu.png"})
            message.channel.send({embeds: [embedhelp]});
        }

        //ROLES REACTIONS
        if(message.content === "!roles"){
            let embedjeux1 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setTitle("Bienvenue dans la sélection de rôles")
                .setDescription("Afin de vous proposer un serveur Discord le plus clair possible, l'accès à certaines sections est restreint.\nMais pas de panique ! Pour y accéder, vous n\'avez qu\'à appuyer sur les boutons qui vous intéressent.\nMerci !")
                .setThumbnail("https://i.imgur.com/9kd0cCd.png")
            let embedjeux2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setTitle("JEUX :")
                .setDescription("Appuyer sur les boutons correspondants à vos jeux préférés.")
            let embedjeux3 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setTitle("NOTIFICATIONS LIVES :")
                .setDescription("Appuyez sur le bouton ci-dessous pour être **notifié** des lives d'HabibCr.")
            let row1 = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("valorant")
                    .setLabel("Valorant")
                    .setStyle("SECONDARY")
                    .setEmoji("959212995169353758")
                ).addComponents(new Discord.MessageButton()
                    .setCustomId("lol")
                    .setLabel("League of Legends")
                    .setStyle("SECONDARY")
                    .setEmoji("959212822292729857")
                ).addComponents(new Discord.MessageButton()
                .setCustomId("tft")
                .setLabel("Teamfight Tactics")
                .setStyle("SECONDARY")
                .setEmoji("959212298180903003")
                );
            let row3 = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                    .setCustomId("notif")
                    .setLabel("Notifications Lives d'HabibCr")
                    .setStyle("SECONDARY")
                    .setEmoji("959215418638237697")
                );
            message.channel.send({embeds: [embedjeux1]});
            message.channel.send({embeds: [embedjeux2], components: [row1]});
            message.channel.send({embeds: [embedjeux3], components: [row3]})
        }

        //ROLES REACTIONS ESPORT
        if(message.content === "!candidesport"){
            let embedesport = new Discord.MessageEmbed()
                .setColor("#cca800")
                .setTitle("Team BDE")
                .setDescription("La Team BDE est une équipe E-Sport TFT dans laquelle vous pourrez participer à de nombreux tournois sous les couleurs de celle-ci.\n\nDonc si vous êtes un joueur TFT, vous pouvez dès maintenant poster votre candidature ci-dessous, en vous présentant personnellement (prénom, âge...) puis en présentant vos qualités in-game, votre Riot ID, les champions que vous jouez et votre rank actuel.\n\nAfin d’offrir la meilleure expérience e-sportive aux joueurs, la Team BDE s’entoure d'encadrants expérimentés dans le domaine.\n\nSensible à la valeur éducative, l'équipe BDE a pour ambition de former LES joueurs de demain, mettant tout en œuvre pour développer leur plein potentiel.")
                .setThumbnail("https://i.imgur.com/9kd0cCd.png")
            let row = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("candidesport")
                    .setLabel("Poster sa candidature")
                    .setStyle("SUCCESS")
                );
            message.channel.send({embeds: [embedesport], components: [row]});
        }

        //EQUIPE
        if(message.content === "!equipe"){
            let embedequipe = new Discord.MessageEmbed()
                .setColor("#cca800")
                .setTitle("Team BDE")
                .setDescription("")
                .addFields(
                    { name: "**__Staff BDE :__**", value: "**Community Manager :** \n**Team Manager :** ", inline: false },
                    { name: "**__Joueurs BDE :__**", value: "-<@702859621584339004> TFT\n-\n-\n-\n-", inline: false },
                )
                .setThumbnail("https://i.imgur.com/9kd0cCd.png")
                //.setFooter({ text: "👑 = Capitaine" })
            message.channel.send({ embeds: [embedequipe] });
        }

        //RESEAU EQUIPE
        /*if(message.content === "!reseauesport"){
            let row = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setLabel("Instagram")
                    .setEmoji('927477016515715074')
                    .setStyle("LINK")
                    .setURL("https://instagram.com/opex_corp_off"))
                .addComponents(new Discord.MessageButton()
                    .setLabel("TikTok")
                    .setEmoji('939525783771304037')
                    .setStyle("LINK")
                    .setURL("https://www.tiktok.com/@opex_corp_off"))
                .addComponents(new Discord.MessageButton()
                    .setLabel("Twitter")
                    .setEmoji('927476996047511563')
                    .setStyle("LINK")
                    .setURL("https://twitter.com/opex_corp_off"));
            let embedequipe = new Discord.MessageEmbed()
                .setColor("#cca800")
                .setTitle("Réseaux Opex Corp")
                .setDescription("**Val League France Opex Corp :**\nhttps://www.vrlfr.gg/fr/leagues/teams/181539-opex-corp")
                .setURL("https://www.vrlfr.gg/fr/leagues/teams/181539-opex-corp")
                //.setThumbnail("https://i.imgur.com/jW2Og6q.png")
                .setImage("https://i.imgur.com/vXESDgF.png")
            message.channel.send({ embeds: [embedequipe], components: [row] });
        }*/

        //AGENT EQUIPE
        /*if(message.content === "!agents"){
            var kj = "<:Killjoy:950065136968818719>"
            var breach = "<:Breach:950065137270788176>"
            var brimstone = "<:Brimstone:950065137597972490>"
            var chamber = "<:Chamber:950065137157558335>"
            var kayo = "<:KAYO:950065137266602014>"
            var raze ="<:Raze:950065137547624448>"
            var sova = "<:Sova:950065137316950077>"
            var jett = "<:jett:950065136679391264>"
            var neon = "<:neon:950065137807683675>"
            var omen = "<:omen:950065136691998770>"
            var reyna = "<:reyna:950065137254027304>"
            var sage = "<:sage:950065137358864434>"
            var viper = "<:viper:950065137031737386>"
            var skye = "<:skye:950158257081700362>"
            var cypher = "<:cypher:951170683491221504>"

            let embedesplit = new Discord.MessageEmbed()
                .setColor("#f0224e")
                .setTitle("Split :")
                .setDescription("")
                .addFields(
                    { name: `crist0 :`, value: `${raze} ${kj} ${skye}`, inline: true },
                    { name: `Sulca :`, value: `${jett} ${reyna}`, inline: true },
                    { name: `Skeaz :`, value: `${sage}`, inline: true },
                    { name: `cStar : `, value: `${raze} ${reyna} ${chamber} ${kayo}`, inline: true},
                    { name: `Antoine : `, value: `${jett} ${reyna} ${breach}`, inline: true},
                    { name: `Shik :`, value: `${reyna} ${omen}`, inline: true },
                )
                .setThumbnail("https://i.imgur.com/2PTksn3.png")

            let embedascent = new Discord.MessageEmbed()
                .setColor("#f0224e")
                .setTitle("Ascent :")
                .setDescription("")
                .addFields(
                    { name: `crist0 :`, value: `${kj} ${brimstone}`, inline: true },
                    { name: `Sulca :`, value: `${jett} ${reyna}`, inline: true },
                    { name: `Skeaz :`, value: `${sage} ${reyna}`, inline: true },
                    { name: `cStar : `, value: `${raze} ${reyna} ${chamber} ${kayo}`, inline: true},
                    { name: `Antoine : `, value: `${jett} ${reyna} ${breach}`, inline: true},
                    { name: `Shik :`, value: `${reyna} ${omen}`, inline: true },
                )
                .setThumbnail("https://i.imgur.com/QWZ4cBz.png")

            let embedbind = new Discord.MessageEmbed()
                .setColor("#f0224e")
                .setTitle("Bind :")
                .setDescription("")
                .addFields(
                    { name: `crist0 :`, value: `${kj} ${brimstone}`, inline: true },
                    { name: `Sulca :`, value: `${jett} ${reyna}`, inline: true },
                    { name: `Skeaz :`, value: `${sage} ${reyna}`, inline: true },
                    { name: `cStar : `, value: `${raze} ${reyna} ${chamber} ${kayo}`, inline: true},
                    { name: `Antoine : `, value: `${jett} ${reyna} ${breach}`, inline: true},
                    { name: `Shik :`, value: `${reyna} ${omen}`, inline: true },
                )
                .setThumbnail("https://i.imgur.com/XJmHeqo.png")

            let embedicebox = new Discord.MessageEmbed()
                .setColor("#f0224e")
                .setTitle("Icebox :")
                .setDescription("")
                .addFields(
                    { name: `crist0 :`, value: `${kj} ${brimstone}`, inline: true },
                    { name: `Sulca :`, value: `${jett} ${reyna}`, inline: true },
                    { name: `Skeaz :`, value: `${sage} ${reyna}`, inline: true },
                    { name: `cStar : `, value: `${raze} ${reyna} ${chamber} ${kayo}`, inline: true},
                    { name: `Antoine : `, value: `${jett} ${reyna} ${breach}`, inline: true},
                    { name: `Shik :`, value: `${viper}`, inline: true },
                )
                .setThumbnail("https://i.imgur.com/74vxkEh.png")

            let embedhaven = new Discord.MessageEmbed()
                .setColor("#f0224e")
                .setTitle("Haven :")
                .setDescription("")
                .addFields(
                    { name: `crist0 :`, value: `${kj} ${brimstone}`, inline: true },
                    { name: `Sulca :`, value: `${jett} ${reyna}`, inline: true },
                    { name: `Skeaz :`, value: `${sage} ${reyna}`, inline: true },
                    { name: `cStar : `, value: `${raze} ${reyna} ${chamber} ${kayo}`, inline: true},
                    { name: `Antoine : `, value: `${jett} ${reyna} ${breach}`, inline: true},
                    { name: `Shik :`, value: `${reyna} ${omen}`, inline: true },
                )
                .setThumbnail("https://i.imgur.com/z6eOJlA.png")

            let embedfracture = new Discord.MessageEmbed()
                .setColor("#f0224e")
                .setTitle("Fracture :")
                .setDescription("")
                .addFields(
                    { name: `crist0 :`, value: `${kj} ${brimstone}`, inline: true },
                    { name: `Sulca :`, value: `${jett} ${reyna}`, inline: true },
                    { name: `Skeaz :`, value: `${reyna}`, inline: true },
                    { name: `cStar : `, value: `${raze} ${reyna} ${chamber} ${kayo}`, inline: true},
                    { name: `Antoine : `, value: `${jett} ${reyna} ${breach}`, inline: true},
                    { name: `Shik :`, value: `${kj}`, inline: true },
                )
                .setThumbnail("https://i.imgur.com/byxhmyg.png")

            let embedbreeze = new Discord.MessageEmbed()
                .setColor("#f0224e")
                .setTitle("Breeze :")
                .setDescription("")
                .addFields(
                    { name: `crist0 :`, value: `${chamber}`, inline: true },
                    { name: `Sulca :`, value: `${jett} ${reyna}`, inline: true },
                    { name: `Skeaz :`, value: `${sage} ${reyna}`, inline: true },
                    { name: `cStar : `, value: `${raze} ${reyna} ${chamber} ${kayo}`, inline: true},
                    { name: `Antoine : `, value: `${jett} ${reyna}`, inline: true},
                    { name: `Shik :`, value: `${viper}`, inline: true },
                )
                .setThumbnail("https://i.imgur.com/jSx7iHt.png")

            message.channel.send({ embeds: [embedesplit] });
            message.channel.send({ embeds: [embedascent] });
            message.channel.send({ embeds: [embedbind] });
            message.channel.send({ embeds: [embedicebox] });
            message.channel.send({ embeds: [embedhaven] });
            message.channel.send({ embeds: [embedfracture] });
            message.channel.send({ embeds: [embedbreeze] });
        }*/

        //REGLEMENT
        if(message.content === "!reglement"){
            message.delete();
            let reglement = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setTitle("RÈGLEMENT :")
                .setDescription("Bienvenue sur le Discord communautaire de la Team BDE\n\nVoici quelques règles à suivre pour s'assurer du bon fonctionnement de ce Discord :")
                .setThumbnail("https://i.imgur.com/9kd0cCd.png")
                .addFields(
                    { name: "➤ 1.", value: "Merci d'être respectueux, gentil et courtois envers chaque utilisateur Discord. Nous vous demandons de ne pas contester les actions du personnel, car elles seront toujours équitables. Si vous contestez les agissements du Staff, plusieurs fois après avoir reçu un avertissement ainsi que des explications de la personne concernée, vous serez banni du serveur Discord.", inline: false},
                    { name: "➤ 2.", value: "Veuillez noter que les utilisateurs de tous âges utilisent ce serveur. Nous voulons que notre communauté soit un environnement sûr pour tous les âges. Nous ne voulons pas de nudité ou autre contenu inapproprié (NSFW).", inline: false},
                    { name: "➤ 3.", value: "La répétition abusive (spam) dans les canaux de texte n'est pas tolérée. Qu'il s'agisse de simples messages ou d'images, ou de l'utilisation abusive du système Discord par @ ou tout autre rôle.", inline: false},
                    { name: "➤ 4.", value: "Ce serveur a pour but de vous offrir une expérience agréable, de vous inviter à échanger et à vous amuser avec la communauté.Nous vous demandons de ne pas y importer vos drames / querelles.", inline: false},
                    { name: "➤ 5.", value: "Si vous avez des problèmes personnels avec un utilisateur, veuillez ne pas l'exposer au serveur, ces choses sont privées et doivent être traitées en privé.", inline: false},
                )
            let boutton = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("reglement")
                    .setLabel("J'accepte le règlement")
                    .setStyle("SUCCESS")
                );
            
            message.channel.send({embeds: [reglement], components: [boutton]});
        }

        //TICKET
        if(message.content === "!ticket"){
            message.delete();
            let embedticketinit = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setTitle("🎫 **Ouvrir un Ticket**")
                .setDescription("Vous souhaitez entrer en contact avec le staff de notre serveur ?\nChoisissez le motif de votre demande ci-dessous :\n\n*⚠️ Tout ticket inutile sera* **sanctionné**.")
                .setThumbnail("https://i.imgur.com/9kd0cCd.png");
            /*let boutton = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("ticket")
                    .setLabel("Ouvrir un ticket")
                    .setStyle("SUCCESS")
                );*/
            let row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId("ticket")
                        .setPlaceholder("Sélectionnez la raison de votre ticket")
                        .addOptions([
                            {
                                label: "Problème technique",
                                description: "Demander de l'aide technique / signaler un bug sur le serveur.",
                                value: "technique",
                            },
                            {
                                label: "Problème relationnel",
                                description: "Signaler un utilisateur qui perturbe le serveur.",
                                value: "relationnel",
                            },
                            {
                                label: "Contester une sanction",
                                description: "Discuter d'une sanction prise par notre équipe de modération.",
                                value: "contestation",
                            },
                            {
                                label: "Suggestion",
                                description: "Proposer des idées afin d'améliorer le serveur.",
                                value: "suggestion",
                            },
                            {
                                label: "Demande de partenariat",
                                description: "Demander un partenariat avec la Team BDE.",
                                value: "partenariat",
                            },
                        ]),
                );
            message.channel.send({embeds: [embedticketinit], components: [row]});
        }

        //TALK
        if(message.content.startsWith("_")){
            message.delete();
            let args = message.content.split("_");
            message.channel.send(args[1]);
            client.channels.cache.get(logs).send(`${message.author.username} vient de faire parler le bot =>\n ${args[1]}`);
        }
    }

    //MODERATION LIENS
    let authorise = ["tenor","gif","giphy","imgur"]
    for(var e in authorise) {
        if(message.content.toLocaleLowerCase().includes(authorise[e].toLowerCase())) return;
    }
    if(message.channel.name.startsWith("╟🎫")) return;

    if(message.author.bot) return;

    let blackjeux = ["steam", "epic", "game", "origin", "uplay"]

    for(var i in blackjeux) {
        if(message.content.toLocaleLowerCase().includes(blackjeux[i].toLowerCase())){
            if(message.channel.id == "959141465752223744"){
                return;
            }
        }
    }


    if(message.channel.id == "959133273852883034") return;
    if(message.channel.id == "959134077259247736") return;
    //Blaclist LIEN sauf media
    let blacklisted = ["discord.gg","youtube.com/channel","twitch.tv","youtube.com/c","twitter.com","facebook.com"]
    let youtube = ["youtube.com","youtu.be"]
    let foundInText = false;

    for(var i in youtube) {
        if(message.content.toLocaleLowerCase().includes(youtube[i].toLowerCase())){
            foundInText = true;
            if(message.channel.id == "959207509036503050"){
                return;
            }
        }
    }

    for(var i in blacklisted) {
        if(message.content.toLocaleLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }
    
    if(foundInText) {
        if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
        message.delete();
        message.channel.send("<@" + message.author + ">, tu n'as pas l'autorisation de poster une PUB sur le serveur, contact un membre du staff pour le faire !");
    } else {
        if(!foundInText){
            if(message.author.bot) return;
            if(message.channel.id == "959133273852883034") return;
            if(message.channel.id == "959134077259247736") return;
    
            //Blaclist LIEN sauf media
            let blacklisted2 = ["www.","http",]
            let foundInText = false;
    
            for(var p in blacklisted2) {
                if(message.content.toLocaleLowerCase().includes(blacklisted2[p].toLowerCase())) foundInText = true;
            }
        
            if(foundInText) {
                if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
                message.delete();
                message.channel.send("<@" + message.author + ">, tu n'as pas l'autorisation de poster de liens sur le serveur, contact un membre du staff pour le faire !");
            }
        }
    }

    


});

client.on("interactionCreate", async interaction => {
    const member = interaction.guild.members.cache.find(member => member.id === interaction.user.id);
    if(interaction.isButton()){
        //REACTION ROLE
        if(interaction.customId === "notif"){
            if(member.roles.cache.has("959222743809798174")){
                member.roles.remove("959222743809798174")
                interaction.reply({content: "Tu ne seras plus notifié des prochains live d'<@614217994142220301> !", ephemeral: true});
            }
            else{
                member.roles.add("959222743809798174");
                interaction.reply({content: "Tu seras notifié des prochains live d'<@614217994142220301>!", ephemeral: true});
            }
        }
        if(interaction.customId === "valorant"){
            if(member.roles.cache.has("959215889834721300")){
                member.roles.remove("959215889834721300")
                interaction.reply({content: "Le rôle <@&959215889834721300> vient de t'être retiré !", ephemeral: true});
            }
            else{
                member.roles.add("959215889834721300");
                interaction.reply({content: "Le rôle <@&959215889834721300> vient de t'être ajouté !", ephemeral: true});
            }
        }
        if(interaction.customId === "lol"){
            if(member.roles.cache.has("959215841113673798")){
                member.roles.remove("959215841113673798")
                interaction.reply({content: "Le rôle <@&959215841113673798> vient de t'être retiré !", ephemeral: true});
            }
            else{
                member.roles.add("959215841113673798");
                interaction.reply({content: "Le rôle <@&959215841113673798> vient de t'être ajouté !", ephemeral: true});
            }
        }
        if(interaction.customId === "tft"){
            if(member.roles.cache.has("959215761547743282")){
                member.roles.remove("959215761547743282")
                interaction.reply({content: "Le rôle <@&959215761547743282> vient de t'être retiré !", ephemeral: true});
            }
            else{
                member.roles.add("959215761547743282");
                interaction.reply({content: "Le rôle <@&959215761547743282> vient de t'être ajouté !", ephemeral: true});
            }
        }
        if(interaction.customId === "reglement"){
            member.roles.add("813744577390313512");
            await interaction.reply({ content: "Tu viens d'accepter le règlement, bienvenue sur notre serveur !", ephemeral: true });
        }
        if(interaction.customId === "askcloseticket") {
            let roleModo = interaction.guild.roles.cache.get('814417003347574784')
            const channel = interaction.channel
            channel.lockPermissions();
            channel.permissionOverwrites.set([
                {   
                    id: interaction.guild.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL]
                },
                {
                    id: roleModo,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL]
                }
            ]);

            const embed = new Discord.MessageEmbed()
                .setTitle('Fermeture du ticket ?')
                .setDescription(`${interaction.user.username} vient de demander la suppresion d'un ticket.`)
            const row = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                .setCustomId("closeticket")
                .setLabel("Oui, supprimer définitivement le ticket")
                .setStyle("DANGER")
                )

            interaction.reply({ embeds: [embed], components: [row]});
            channel.setName('⛔〡TICKET FERMÉ');
            client.channels.cache.get(ticketslogs).send(`🎫 <@${interaction.user.id}> vient de demander la suppresion d'un ticket :\n ${channel.name}`);
        }
        if(interaction.customId === "closeticket") {
            const channel = interaction.channel
            client.channels.cache.get(ticketslogs).send(`🎫 <@${interaction.user.id}> vient de supprimer un ticket :\n ${channel.name}`);
            channel.delete();
        }

        //CANDIDESPORT
        const row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
            .setCustomId("askcloseticket")
            .setLabel("Fermer la candidature")
            .setStyle("DANGER")
            )
                
                
        let catégorie = "814766835110117396"

        let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)

        if (interaction.customId == "candidesport") {
            if (DejaUnChannel) return interaction.reply({content: ':x: Vous avez actuellement un ticket déjà ouvert sur notre serveur.', ephemeral: true})
                interaction.guild.channels.create(`╟📑${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const esport = new Discord.MessageEmbed()
                    .setTitle('Candidature Team BDE')
                    .setDescription('Merci de détailler votre demande ci-dessous, le Community Manager va vous répondre dans les plus brefs délais.')
                    c.send({embeds: [esport], content: `${interaction.user} | <@&959148366556712970>`, components: [row]})
                    interaction.reply({content: `:white_check_mark: Postez votre demande juste ici ==> <#${c.id}>`, ephemeral: true})
                    client.channels.cache.get(ticketslogs).send(`🎫━<@${interaction.user.id}> vient de créer un cv pour postuler à la Team BDE :\n<#${c.id}>`);
                })
            }
    }

    if(interaction.isSelectMenu()){
        //TICKET
        const row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
            .setCustomId("askcloseticket")
            .setLabel("Fermer le ticket")
            .setStyle("DANGER")
            )
                
                
        let catégorie = "959143410848120903"
        let roleModo = interaction.guild.roles.cache.get('814417003347574784')

        let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)

        if (interaction.customId == "ticket") {
            if (DejaUnChannel) return interaction.reply({content: ':x: Vous avez actuellement un ticket déjà ouvert sur notre serveur.', ephemeral: true})
            if (interaction.values[0] == "technique") {
                interaction.guild.channels.create(`╟🎫${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleModo,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const pbtechnique = new Discord.MessageEmbed()
                    .setTitle('Ticket signalement de problème technqiue')
                    .setDescription('Merci de détailler votre problème ci-dessous, un membre du staff va vous répondre dans les plus bref délais.')
                    c.send({embeds: [pbtechnique], content: `${roleModo} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `:white_check_mark: Votre ticket a bien été créé ! <#${c.id}>`, ephemeral: true})
                    client.channels.cache.get(ticketslogs).send(`🎫━<@${interaction.user.id}> vient de créer un ticket de demande de support technique :\n<#${c.id}>`);
                })
                
            } else if (interaction.values[0] == "relationnel") {
                interaction.guild.channels.create(`╟🎫${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleModo,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const plainte = new Discord.MessageEmbed()
                    .setTitle('Ticket de signalement de comportement')
                    .setDescription('Merci de détailler votre problème ci-dessous, un membre du staff va vous répondre dans les plus bref délais.')
                    c.send({embeds: [plainte], content: `${roleModo} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `:white_check_mark: Votre ticket a bien été créé ! <#${c.id}>`, ephemeral: true})
                    client.channels.cache.get(ticketslogs).send(`🎫📛 <@${interaction.user.id}> vient de créer un ticket de plainte relationnel :\n<#${c.id}>`);
                })
            } else if (interaction.values[0] == "partenariat") {
                interaction.guild.channels.create(`╟🎫${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleModo,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Ticket de demande de partenariat')
                    .setDescription('Merci de détailler votre demande ci-dessous, un membre du staff va vous répondre dans les plus bref délais.')
                    c.send({embeds: [embed], content: `${interaction.user} | <@614217994142220301>`, components: [row]})
                    interaction.reply({content: `:white_check_mark: Votre ticket a bien été créé ! <#${c.id}>`, ephemeral: true})
                    client.channels.cache.get(ticketslogs).send(`🎫🤝 <@${interaction.user.id}> vient de créer un ticket de demande de partenariat :\n<#${c.id}>`);
                })
            } else if (interaction.values[0] == "suggestion") {
                interaction.guild.channels.create(`🎫〡${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleModo,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Ticket de suggestion d\'amélioration')
                    .setDescription('Merci de détailler votre demande ci-dessous, un membre du staff va vous répondre dans les plus bref délais.')
                    c.send({embeds: [embed], content: `${interaction.user} | <@&813313219631775754>`, components: [row]})
                    interaction.reply({content: `:white_check_mark: Votre ticket a bien été créé ! <#${c.id}>`, ephemeral: true})
                    client.channels.cache.get(ticketslogs).send(`🎫✨ <@${interaction.user.id}> vient de créer un ticket de proposition de suggestion d'amélioration :\n<#${c.id}>`);
                })
            }else if (interaction.values[0] == "contestation") {
                interaction.guild.channels.create(`🎫〡${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleModo,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{

                    if(warn["warn"][interaction.user.id] == undefined){
                        var embedinfractions = new Discord.MessageEmbed()
                                .setColor("#00FF00")
                                .setTitle(interaction.member.displayName + " n'a pas d'infractions !")
                                .setThumbnail(interaction.user.avatarURL())
                                .setDescription("Continue comme ça ! ❤")
                    }
                    else {
                        var embedinfractions = new Discord.MessageEmbed()
                                .setColor("#FE8401")
                                .setTitle("Voici les infractions de " + interaction.member.displayName)
                                .setThumbnail(interaction.user.avatarURL())
                                .setDescription(warn["warn"][interaction.user.id])
                    }



                    const embed = new Discord.MessageEmbed()
                    .setTitle('Contester une sanction')
                    .setDescription('Merci de détailler votre demande ci-dessous, un membre du staff va vous répondre dans les plus bref délais.')
                    c.send({embeds: [embed], content: `${interaction.user}`, components: [row]})
                    c.send({ embeds: [embedinfractions] })
                    interaction.reply({content: `:white_check_mark: Votre ticket a bien été créé ! <#${c.id}>`, ephemeral: true})
                    client.channels.cache.get(ticketslogs).send(`🎫⚔️ <@${interaction.user.id}> vient de créer un ticket de contestation de sanction :\n<#${c.id}>`);
                })
            }
        }
    }

    if(interaction.isCommand()){
        if (member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {

            //BAN
            if(interaction.commandName === "ban"){
                const utilisateur = interaction.options.getMember("utilisateur");
                const raison = interaction.options.getString("raison");

                var embedban = new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle(utilisateur.displayName + " a été banni de ce serveur.")
                    .setDescription("")
                    .addFields(
                        { name: "Raison :", value: raison, inline: false},
                        )
                
                if(utilisateur.bannable){
                    utilisateur.ban();
                    interaction.reply({ embeds: [embedban]});
                    client.channels.cache.get(banchn).send(`⛔ ${utilisateur} vient d'être banni par ${member.displayName} pour la raison suivante :\n${raison}`);
                }
                else {
                    interaction.reply("Tu n'as pas la permission de bannir ce membre !");
                }
            }

            //kick
            if(interaction.commandName === "kick"){
                const utilisateur = interaction.options.getMember("utilisateur");
                const raison = interaction.options.getString("raison");

                var embedkick = new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle(utilisateur.displayName + " a été explusé de ce serveur.")
                    .setDescription("")
                    .addFields(
                        { name: "Raison :", value: raison, inline: false},
                        )
                
                if(utilisateur.kickable){
                    utilisateur.kick();
                    interaction.reply({ embeds: [embedkick]});
                    client.channels.cache.get(banchn).send(`⚠️ ${utilisateur} vient d'être expulsé par ${member.displayName} pour la raison suivante :\n${raison}`);
                }
                else {
                    interaction.reply("Tu n'as pas la permission d'expulser ce membre !");
                }
            }

            //MUTE
            if(interaction.commandName === "mute"){
                const utilisateur = interaction.options.getMember("utilisateur");
                const raison = interaction.options.getString("raison");
                const temps = interaction.options.getString("temps");

                setTimeout(function() {
                    utilisateur.roles.remove("959150643824697355");
                    var embedunmute = new Discord.MessageEmbed()
                        .setColor("#2FFF5D")
                        .setTitle(utilisateur.displayName + " peut de nouveau parler")
                        .setDescription("")

                interaction.channel.send({embeds: [embedunmute]});//.then(sent => sent.delete({timeout: 5000}));
                client.channels.cache.get(banchn).send(`🔊 ${utilisateur} vient d'être démute automatiquement`);
                }, temps * 1000);

                utilisateur.roles.add("959150643824697355");
                var embedmute = new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle(utilisateur.displayName + " est rendu muet")
                    .setDescription("")
                    .setThumbnail(utilisateur.user.avatarURL())
                    .addFields(
                        { name: "Raison :", value: raison, inline: false},
                        { name: "Durée :", value: temps / 60 + " minutes", inline: true},
                    )
                    
                var embedmutedm = new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle("Bonjour " + utilisateur.displayName)
                    .setDescription("Vous venez d'être rendu muet sur le serveur Team BDE pour un certain temps,\nVous pouvez consultez la raison de cette mesure ci-dessous.\n\nSi vous **contestez** la **décision prise** pas nos modérateurs, merci d'**ouvrir** un <#959143685428248576> afin d'en discuter !")
                    .setThumbnail(utilisateur.user.avatarURL())
                    .addFields(
                        { name: "Raison :", value: raison, inline: false},
                        { name: "Durée :", value: temps / 60 + " minutes", inline: true},
                    )
                    .setImage("https://i.imgur.com/9kd0cCd.png")

                utilisateur.send({ embeds: [embedmutedm] }).catch(err => {
                    console.log("Erreur dm warn" + err);
                    client.channels.cache.get(logs).send({content: "Impossible d'envoyer un dm à " + utilisateur.displayName});
                });
                interaction.reply({embeds: [embedmute]});//.then(sent => sent.delete({timeout: args[2] * 1000 + 5000}));
                client.channels.cache.get(banchn).send(`🔈 ${utilisateur} vient d'être mute pendant ${temps / 60} minutes par ${member.displayName} pour la raison suivante :\n${raison}`);
            }

            //UNMUTE
            if(interaction.commandName === "unmute"){
                const utilisateur = interaction.options.getMember("utilisateur");
                    
                utilisateur.roles.remove("959150643824697355");
                var embedunmute = new Discord.MessageEmbed()
                    .setColor("#2FFF5D")
                    .setTitle(utilisateur.displayName + " peut de nouveau parler")
                    .setDescription("")

                interaction.channel.send({embeds: [embedunmute]});//.then(sent => sent.delete({timeout: 5000}));
                client.channels.cache.get(banchn).send(`🔊 ${utilisateur} vient d'être démute par ${member.displayName}`);
            }
            

            //CLEAR
            if(interaction.commandName === "clear"){
                if(interaction.channel.id == "958831725457342494"){
                    interaction.reply("Impossible de d'effacer un message dans ce channel.");
                    return;
                }
                const nombre = interaction.options.getNumber("nombre");
                const utilisateur = interaction.options.getMember("utilisateur");

                const Messages = await interaction.channel.messages.fetch();

                const Reponse = new Discord.MessageEmbed()
                    .setColor("LUMINOUS_VIVID_PINK");

                if(utilisateur) {
                    let i = 0;
                    const filtered = [];
                    (await Messages).filter((m) => {
                        if(m.author.id === utilisateur.id && nombre > i){
                            filtered.push(m);
                            i++;
                        }
                    })

                    await interaction.channel.bulkDelete(filtered, true).then(messages => {
                        Reponse.setDescription('🧹 ' + messages.size + ' messages supprimés pour <@' + utilisateur + '>.');
                        interaction.reply({embeds: [Reponse], ephemeral: true});
                        client.channels.cache.get(logs).send('🧹 ' + messages.size + ' messages de <@' + utilisateur + '> ont été supprimés dans le salon <#' + interaction.channel.id + '> par ' + member.displayName);
                    })
                }else {
                    await interaction.channel.bulkDelete(nombre, true).then(messages => {
                        Reponse.setDescription('🧹 ' + messages.size + ' messages supprimés.');
                        interaction.reply({embeds: [Reponse], ephemeral: true});
                        client.channels.cache.get(logs).send('🧹 ' + messages.size + ' messages ont été supprimés dans le salon <#' + interaction.channel.id + '> par ' + member.displayName);
                    })
                }
            }
            

            //ME
            if(interaction.commandName === "me"){
                const texte = interaction.options.getString("texte");
                interaction.reply({content: texte});
            }
            //Embed
            if(interaction.commandName === "embed"){
                const titre = interaction.options.getString("titre");
                const description = interaction.options.getString("description");
                const couleur = interaction.options.getString("couleur");
                const image = interaction.options.getString("image");
                const thumbnail = interaction.options.getString("thumbnail");

                let embedfinal = new Discord.MessageEmbed()
	                .setColor(couleur)
	                .setTitle(titre)
	                .setDescription(description)
	                .setThumbnail(thumbnail)
	                .setImage(image)

                interaction.reply({ embeds: [embedfinal] });
            }
            //WARN
            if(interaction.commandName === "warn"){
                const mention = interaction.options.getMember("utilisateur");
                const raison = interaction.options.getString("raison");

                if(warn["warn"][mention.id] == undefined){
                    mention.roles.add("959151030245949450");
                    var embedwarn = new Discord.MessageEmbed()
                        .setColor("#FE8401")
                        .setTitle(mention.displayName + " a reçu un Avertissement !")
                        .setThumbnail(mention.user.avatarURL())
                        .setDescription("")
                        .addFields(
                            { name: "Raison :", value: raison, inline: false},
                            )
                    warn["warn"][mention.id] = raison;
                    //DM
                    var embedwarndm = new Discord.MessageEmbed()
                        .setColor("#FE8401")
                        .setTitle("Bonjour " + mention.displayName)
                        .setThumbnail(mention.user.avatarURL())
                        .setDescription("Vous venez de recevoir un avertissement sur le serveur Team BDE,\nCette avertissement est à titre préventif,\nVeuillez prendre soins de lire la raison de cette avertissement, des mesures plus sévères seront employées en cas de récidives.\n\n Si vous **contestez** la **décision prise** pas nos modérateurs, merci d'**ouvrir** un <#959143685428248576> afin d'en discuter !")
                        .addFields(
                            { name: "Raison :", value: raison, inline: false},
                            )
                        .setImage("https://i.imgur.com/9kd0cCd.png")
                    Savewarn()
                }
                else {
                    var embedwarn = new Discord.MessageEmbed()
                        .setColor("#FF0000")
                        .setTitle(mention.displayName + " a encore reçu un Avertissement !")
                        .setThumbnail(mention.user.avatarURL())
                        .setDescription("")
                        .addFields(
                            { name: "Raison :", value: raison, inline: false},
                            { name: "Dernier(s) avertissement(s) :", value: warn["warn"][mention.id]},
                            )
                    warn["warn"][mention.id] = warn["warn"][mention.id] + "\n\n" + raison;
                    //DM
                    var embedwarndm = new Discord.MessageEmbed()
                        .setColor("#FF0000")
                        .setTitle("Bonjour " + mention.displayName)
                        .setThumbnail(mention.user.avatarURL())
                        .setDescription("Vous venez de recevoir un avertissement **supplémentaire** sur le serveur Team BDE,\n\nDes **mesures plus sévères** ont été appliqués ou seront appliqués.\n\n Si vous **contestez** la **décision prise** pas nos modérateurs, merci d'**ouvrir** un <#959143685428248576> afin d'en discuter !")
                        .addFields(
                            { name: "Raison :", value: raison, inline: false},
                            { name: "Dernier(s) avertissement(s) :", value: warn["warn"][mention.id]},
                            )
                        .setImage("https://i.imgur.com/9kd0cCd.png")
                    Savewarn()
                }
                interaction.reply({ embeds: [embedwarn] });
                client.channels.cache.get(warnchn).send({content: "Modération par " + member.displayName + ", " + member.user.username + ", " + member.id + " de l'utilisateur id : " + mention.id,embeds: [embedwarn] });
                mention.send( {embeds: [embedwarndm] }).catch(err => {
                    console.log("Erreur dm warn" + err);
                    client.channels.cache.get(logs).send({content: "Impossible d'envoyer un dm à " + mention.displayName});
                });
            }

            //UNWARN
            if(interaction.commandName === "unwarn"){
                const mention = interaction.options.getMember("utilisateur");

                if(warn["warn"][mention.id] == undefined){
                    var embedinfractions = new Discord.MessageEmbed()
                        .setColor("#00FF00")
                        .setTitle(mention.displayName + " n'a pas d'infractions !")
                        .setThumbnail(mention.user.avatarURL())
                        .setDescription("Il n'y a rien a supprimer !")
                }
                else {
                    mention.roles.remove("959151030245949450");
                    var embedinfractions = new Discord.MessageEmbed()
                        .setColor("#00FF00")
                        .setTitle("Les infraction suivantes de " + mention.displayName + " sont supprimées.")
                        .setThumbnail(mention.user.avatarURL())
                        .setDescription(warn["warn"][mention.id])
                    delete warn["warn"][mention.id]
                    Savewarn()
                }
                interaction.reply({ embeds: [embedinfractions] });
                client.channels.cache.get(warnchn).send({content: "Modération par " + member.displayName + ", " + member.user.username + ", " + member.id ,embeds: [embedinfractions]});
            }

            //CHECKWARN
            if(interaction.commandName === "checkwarn"){
                const mention = interaction.options.getMember("utilisateur");

                if(warn["warn"][mention.id] == undefined){
                    var embedinfractions = new Discord.MessageEmbed()
                            .setColor("#00FF00")
                            .setTitle(mention.displayName + " n'a pas d'infractions !")
                            .setThumbnail(mention.user.avatarURL())
                            .setDescription("Continue comme ça ! ❤")
                }
                else {
                    var embedinfractions = new Discord.MessageEmbed()
                            .setColor("#FE8401")
                            .setTitle("Voici les infractions de " + mention.displayName)
                            .setThumbnail(mention.user.avatarURL())
                            .setDescription(warn["warn"][mention.id])
                }
                interaction.reply({ embeds: [embedinfractions] });
            }
        }
    }
});

client.on("messageUpdate", function (oldMessage, newMessage) {
    if(newMessage.author.bot) return;
    console.log(`Message de ${newMessage.author.username} mis à jour !`);
    client.channels.cache.get(logs).send(`💬🔄 ${newMessage.author.username} vient de mettre à jour son message :\n${oldMessage}\n=>\n${newMessage}`);
});

client.on("messageDelete", function (messageDelete) {
    client.channels.cache.get(logs).send(`💬🚮 Le message de ${messageDelete.author.username} vient d'être suprimé :\n${messageDelete}`);
});

client.on("guildMemberAdd", member => {
    let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle(member.user.tag + " viens de rejoindre le serveur !")
        .setDescription("<@" + member.id + ">\n" + member.displayName)
        .setThumbnail(member.user.avatarURL())

    client.channels.cache.get(joinchn).send({ embeds: [embed]});
});

client.on("guildMemberRemove", member => {
    let embed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle(member.user.tag + " viens de quitter le serveur.")
        .setDescription("<@" + member.id + ">\n" + member.displayName)
        .setThumbnail(member.user.avatarURL())

    client.channels.cache.get(joinchn).send({ embeds: [embed]});
});

//
//CHANNEL MANAGER
const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);
//
// Register a new main channel
//
//
tempChannels.registerChannel("814397772350488577", {
    childCategory: "814397450365304843",
    childAutoDeleteIfEmpty: true,
    childMaxUsers: 0,
    childFormat: (member, count) => `🔊〡Salon ${count}`
});
tempChannels.registerChannel("959143077568729119", {
    childCategory: "813745225893019649",
    childAutoDeleteIfEmpty: true,
    childMaxUsers: 0,
    childFormat: (member, count) => `🎮〡Salon ${count}`
});
tempChannels.registerChannel("959138810355150868", {
    childCategory: "814766835110117396",
    childAutoDeleteIfEmpty: true,
    childMaxUsers: 0,
    childFormat: (member, count) => `🔊〡Entraînement ${count}`
});



//MUSIQUE
const settings = {
    prefix: '!'
};



const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: false, // This options are optional.
});
// You can define the Player as *client.player* to easily access it.
client.player = player;

client.on("ready", () => {
    console.log("I am ready to Play with DMP 🎶");
});

const { RepeatMode } = require('discord-music-player');

client.player
    // Emitted when channel was empty.
    .on('channelEmpty',  (queue) =>
        console.log(`Everyone left the Voice Channel, queue ended.`))
    // Emitted when a song was added to the queue.
    .on('songAdd',  (queue, song) =>
        console.log(`Song ${song} was added to the queue.`))
    // Emitted when a playlist was added to the queue.
    .on('playlistAdd',  (queue, playlist) =>
        console.log(`Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`))
    // Emitted when there was no more music to play.
    .on('queueDestroyed',  (queue) =>
        console.log(`The queue was destroyed.`))
    // Emitted when the queue was destroyed (either by ending or stopping).    
    .on('queueEnd',  (queue) =>
        console.log(`The queue has ended.`))
    // Emitted when a song changed.
    .on('songChanged', (queue, newSong, oldSong) =>
        console.log(`${newSong} is now playing.`))
    // Emitted when a first song in the queue started playing.
    .on('songFirst',  (queue, song) =>
        console.log(`Started playing ${song}.`))
    // Emitted when someone disconnected the bot from the channel.
    .on('clientDisconnect', (queue) =>
        console.log(`I was kicked from the Voice Channel, queue ended.`))
    // Emitted when deafenOnJoin is true and the bot was undeafened
    .on('clientUndeafen', (queue) =>
        console.log(`I got undefeanded.`))
    // Emitted when there was an error in runtime
    .on('error', (error, queue) => {
        console.log(`Error: ${error} in ${queue.guild.name}`);
    });

client.on('messageCreate', async (message) => {
    if(message.content == "!help"){
        var embedcmdmusique = new Discord.MessageEmbed()
            .setColor("#362cbf")
            .setTitle("Commandes Musique :")
            .setDescription("Voici toutes les commandes pour gérer la musique lorsque tu es dans un salon vocal :")
            .addFields(
                { name: "!play + musique", value: "Jouer de la musique.", inline: false},
                { name: "!skip", value: "Jouer la musique suivante dans la liste d'attente.", inline: false},
                { name: "!stop", value: "Arrêter la lecture.", inline: false},
                { name: "!pause", value: "Mettre en pause la lecture.", inline: false},
                { name: "!resume", value: "Reprendre la lecture.", inline: false},
                { name: "!progression", value: "Afficher la progression de la lecture.", inline: false},
                { name: "!toogleLoop", value: "Activer la répétition du morceau actuel.", inline: false},
                { name: "!toogleQueueLoop", value: "Activer la répétition de la file d'attente.", inline: false},
                { name: "!removeLoop", value: "Désactiver la répétition.", inline: false},
                { name: "!clearQueue", value: "Supprimer les morceaux de la liste d'attente.", inline: false},
                { name: "!getQueue", value: "Afficher la liste d'attente.", inline: false},
                { name: "!getVolume", value: "Afficher le volume actuel.", inline: false},
                { name: "!nowPlaying", value: "Afficher le morceau actuel.", inline: false}
            )
        message.channel.send({ embeds: [embedcmdmusique]});
    }

    if(message.channel.id == "959207509036503050"){
        const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
        const command = args.shift();
        let guildQueue = client.player.getQueue(message.guild.id);

        if(command === 'play') {
            let queue = client.player.createQueue(message.guild.id);
            await queue.join(message.member.voice.channel);
            let song = await queue.play(args.join(' ')).catch(_ => {
                if(!guildQueue)
                    queue.stop();
            });
            message.reply(`Musique ajoutée à la liste de lecture :\n🎶 ${song} 🎶`);
        }

        if(command === 'playlist') {
            let queue = client.player.createQueue(message.guild.id);
            await queue.join(message.member.voice.channel);
            let song = await queue.playlist(args.join(' ')).catch(_ => {
                if(!guildQueue)
                    queue.stop();
            });
        }

        if(command === 'skip') {
            guildQueue.skip();
            message.channel.send(`${message.author} vient de passer la musique.`);
        }

        if(command === 'stop') {
            guildQueue.stop();
            message.channel.send(`${message.author} vient d'arrêter la musique.`);
        }

        if(command === 'removeLoop') {
            guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
            message.reply("Répétition désactivée.");
        }

        if(command === 'toggleLoop') {
            guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
            message.reply("Répétition du morceau activée.");
        }

        if(command === 'toggleQueueLoop') {
            guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
            message.reply("Répétition de la playlist activée.");
        }

        if(command === 'seek') {
            guildQueue.seek(parseInt(args[0]) * 1000);
        }

        if(command === 'clearQueue') {
            guildQueue.clearQueue();
            message.reply("File d'attente supprimée.");
        }

        if(command === 'shuffle') {
            guildQueue.shuffle();
        }

        if(command === 'getQueue') {
            console.log(guildQueue);
            message.channel.send(guildQueue);
        }

        if(command === 'getVolume') {
            console.log(guildQueue.volume)
            message.reply(`Volume actuel : ${guildQueue.volume}`);
        }

        if(command === 'nowPlaying') {
            console.log(`Now playing: ${guildQueue.nowPlaying}`);
            message.reply(`Musique en cours : ${guildQueue.nowPlaying}`);
        }

        if(command === 'pause') {
            guildQueue.setPaused(true);
            message.reply(`Lecture en pause.`)
        }

        if(command === 'resume') {
            guildQueue.setPaused(false);
            message.reply(`Reprise de lecture.`)
        }

        if(command === 'remove') {
            guildQueue.remove(parseInt(args[0]));
        }

        if(command === 'progression') {
            const ProgressBar = guildQueue.createProgressBar();
            message.reply(ProgressBar.prettier);
        }
    }
})




client.login(process.env.TOKEN);