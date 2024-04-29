/* eslint-disable quotes */

import { domainURL, questionsEmail } from '@/service/api-config'
import membership from 'Assets/data/spc_membership_price'

export default [
  {
    "en": {
      "question": "What is SPC?",
      "answer": "Student Price Card is Canada's most popular student discount program. SPC is an $" + membership.price + "/year (one time fee) membership that gives you access to 450+ unlimited discounts, of up to 25% off! <br><br> For only $" + membership.price + "/year, SPC gets students the best deals on fashion, beauty, food, fitness, tech, everyday essentials and more- it basically pays for itself! Use your SPC membership over and over again at thousands of participating locations and online to receive instant discounts every time you shop."
    },
    "fr": {
      "question": "Qui est SPC?",
      "answer": "Student Price Card est le programme de rabais pour étudiants le plus populaire au Canada. SPC consiste en une adhésion de 11,99 $ par an (frais uniques) qui vous permet de bénéficier de plus de 450 remises illimitées, pouvant atteindre 25% de rabais! <br><br>En payant seulement 11,99 $ par an, SPC garantit aux étudiants les meilleures offres en matière de mode, de beauté, de nourriture, de santé, de technologie, d'articles essentiels de tous les jours et bien plus encore. Servez-vous de votre adhésion SPC encore et encore dans des milliers de points de vente participants et en ligne pour obtenir des rabais instantanés chaque fois que vous faites des achats.."
    }
  },
  {
    "en": {
      "question": "Is SPC only for students?",
      "answer": "YES! SPC is a student-exclusive membership. All students are eligible to receive discounts and deals but may be required to show valid student ID when redeeming offers. We’ve made life easy- store your student ID right in the SPC app for ease of access when showing your membership in-store. <br> Due to privacy reasons, students under 13 are not eligible for an SPC membership."
    },
    "fr": {
      "question": "SPC est-il réservé aux étudiants ?",
      "answer": "OUI! SPC est une adhésion exclusivement destinée aux étudiants. Tous les étudiants sont éligibles pour bénéficier de remises et d'offres, mais il est possible qu'il leur soit demandé de présenter une carte d'étudiant valide afin de pouvoir bénéficier des offres. Pour faciliter le processus, nous mettons à votre disposition votre carte d'étudiant dans l'application SPC afin de pouvoir la présenter facilement en magasin. <br>Pour des raisons de confidentialité, les élèves de moins de 13 ans ne sont pas éligibles pour une adhésion SPC. "
    }
  },
  {
    "en": {
      "question": "Do I need to show student I.D.?",
      "answer": "Students 16+ may be requested to present valid student identification to receive their discount. SPC partners have the right to refuse any discount if valid student ID is not provided, with the exceptions of a VIP membership and SPC+/CIBC memberships. <br> Be sure to upload your student ID in the SPC app to take it with you, everywhere you go!"
    },
    "fr": {
      "question": "Dois-je présenter une carte d'étudiant? ",
      "answer": "Les étudiants de plus de 16 ans peuvent être invités à présenter une carte d'étudiant valide pour bénéficier de leur réduction. Les partenaires de SPC ont le droit de refuser toute réduction si une carte d'étudiant valide n'est pas fournie, à l'exception des adhésions VIP et des adhésions SPC+/CIBC. <br> N'oubliez pas de télécharger votre carte d'étudiant dans l'application SPC pour l'emporter avec vous, partout où vous allez! "
    }
  },
  {
    "en": {
      "question": "How do I get access to all the offers?",
      "answer": "Join SPC for only $11.99/year to get access to over 450 discounts To begin, please create an account, by clicking <a href=" + domainURL + '/signup/account-creation' + ">here</a> or download the SPC app on <a href='https://apps.apple.com/ca/app/spc-card/id716091998'>IOS</a> or <a href='https://play.google.com/store/apps/details?id=com.spc.app'>Google Play</a>"
    },
    "fr": {
      "question": "Comment puis-je avoir accès à toutes les offres ?",
      "answer": "Adhérez à SPC pour seulement 11,99 $/an et accédez à plus de 450 remises. Pour commencer, veuillez créer un compte en cliquant <a href=" + domainURL + '/signup/account-creation' + ">ici</a> ou téléchargez l'application SPC sur <a href='https://apps.apple.com/ca/app/spc-card/id716091998'>IOS</a> ou <a href='https://play.google.com/store/apps/details?id=com.spc.app'>Google Play</a>"
    }
  },
  {
    "en": {
      "question": "How do I get a physical card?",
      "answer": "SPC is a digital membership program. There is no physical card available. The SPC app gives you access to all offers and other membership benefits."
    },
    "fr": {
      "question": "Comment obtenir une carte physique? ",
      "answer": "SPC est un programme d'adhésion numérique. Il n'y a pas de carte physique disponible. L'application SPC vous permet d'accéder à toutes les offres et aux autres avantages des membres."
    }
  }
]

export const CIBC_FAQS = [
  {
    "en": {
      "question": "How do I register and use my SPC+ digital membership?",
      "answer": "Register online at <u>cibc.com/spc</u>. Click the “Register for free SPC+” button. After signing into your Online or Mobile Banking account and accepting Terms & Conditions, you’ll then be transferred to the SPC site to complete your digital card’s registration. Once registered, you’ll be sent an email from SPC confirming your registration. Download the SPC app to your phone and show your digital membership at participating stores or use it when shopping online."
    },
    "fr": {
      "question": "Comment puis-je m'inscrire et utiliser mon adhésion numérique SPC+?",
      "answer": "Inscrivez-vous en ligne à <u>cibc.com/spc</u>. Cliquez sur “Inscription gratuite à SPC”. Après avoir ouvert une session dans votre compte bancaire en ligne ou mobile et accepté les termes et conditions, vous serez transféré sur le site SPC pour compléter l'inscription de votre carte numérique. Une fois achevé, vous recevrez un courriel de SPC confirmant votre inscription. Téléchargez l'application SPC sur votre téléphone et montrez votre carte numérique dans les magasins participants ou utilisez-la lors de vos achats en ligne."
    }
  },
  {
    "en": {
      "question": "What’s SPC+?",
      "answer": "SPC+ is a membership through the partnership between CIBC and SPC that provides eligible student and youth clients with a free SPC+ membership and exclusive access to better discounts, special experiences, giveaways and more. SPC+ membership is inclusive of the overall SPC program benefits such as access to over 450 offers providing instant student savings of up to 30% off. Students with SPC+ save an average of $340 each year."
    },
    "fr": {
      "question": "Qu'est-ce que SPC+?",
      "answer": "SPC+ est une adhésion issue du partenariat entre CIBC et SPC qui donner aux étudiants et aux jeunes clients admissibles une adhésion SPC+ gratuitement et d'avoir un accès exclusif à de meilleurs rabais, à des expériences spéciales, à des concours et plus encore. L'adhésion SPC+ comprend tout les avantages de SPC, comme l'accès à plus de 450 offres permettant aux étudiants d'économiser instantanément jusqu'à 30 % de rabais. Les étudiants bénéficiant de l'adhésion SPC+ économisent en moyenne 340 $ par an."
    }
  },
  {
    "en": {
      "question": "How can I receive the free SPC+ membership through CIBC?",
      "answer": "To be eligible for the free SPC+ membership you must hold an eligible CIBC youth or student bank account, student credit card, or student line of credit and be 14 years of age or older at the time of registration or renewal of your membership. If the product you use to qualify for the membership is a student line of credit, you must also be under 30 years of age."
    },
    "fr": {
      "question": "Comment puis-je obtenir d’une adhésion SPC+ gratuite par CIBC?",
      "answer": "Pour être admissible à l'adhésion SPC+ gratuite, vous devez avoir un compte bancaire pour jeunes ou étudiants admissibles de CIBC, ou une carte ou marge de crédit pour étudiants et être âgé de 14 ans ou plus au moment de l'inscription ou du renouvellement de votre adhésion. Si le produit que vous utilisez pour être admissible à l'adhésion est une marge de crédit pour étudiants, vous devez également être âgé de moins de 30 ans."
    }
  },
  {
    "en": {
      "question": "I don’t know if I qualify. What services apply for CIBC student and youth products?",
      "answer": "Not sure if you qualify? Please visit <u>CIBC.com/SPC</u> or contact CIBC support line at 1-800-465-2422 and they will be more than happy to help eligible clients register for their free SPC+ membership. Don’t qualify? Easy fix! A CIBC representative will be able to help find all eligible clients a product or service that is better suited for your needs – plus you will get a free SPC+ membership."
    },
    "fr": {
      "question": "Je ne sais pas si je suis admissible. Quels services sont admissibles à titre de produits pour étudiants et jeunes CIBC?",
      "answer": "Vous ne savez pas si vous êtes admissible? Visitez <u>CIBC.com/SPC</u> ou communiquer avec la ligne de soutien de CIBC au 1 800-465-2422 et ils se feront un plaisir d'aider les clients admissibles à s'inscrire à leur adhésion SPC+ gratuite. Vous n'êtes pas admissible? C'est facile! Un représentant de CIBC pourra aider tous les clients admissibles à trouver un produit ou un service mieux adapté à leurs besoins - et vous obtiendrez une adhésion SPC+ gratuite."
    }
  },
  {
    "en": {
      "question": "Which CIBC student or youth products are eligible for a free SPC+ membership?",
      "answer": "Visit online at <u>cibc.com/spc</u> for a list of eligible student & youth products"
    },
    "fr": {
      "question": "Quels produits CIBC destinés aux étudiants ou aux jeunes sont admissibles à une adhésion gratuite à SPC+ ?",
      "answer": "Visitez le site <u>cibc.com/spc</u> pour obtenir la liste des produits pour étudiants et jeunes admissibles."
    }
  },
  {
    "en": {
      "question": "As a CIBC student or youth client, do I have to renew my SPC+ membership?",
      "answer": "Your membership will be automatically renewed every year as long as you hold an eligible CIBC student or youth product at the time of membership renewal."
    },
    "fr": {
      "question": "En tant que client étudiant ou jeune de CIBC, dois-je renouveler mon adhésion SPC+?",
      "answer": "Votre adhésion sera automatiquement renouvelée chaque année, à condition que vous déteniez un produit étudiant ou jeune CIBC admissible au moment du renouvellement de l'adhésion."
    }
  },
  {
    "en": {
      "question": "As an SPC+ member, do I have to renew my membership every year?",
      "answer": "SPC+ members will not have to renew their memberships. As long as you continue to qualify for a CIBC student or youth account, you will automatically be sent a new SPC+ membership number every year for free and continue to enjoy the benefits of the SPC+ program!"
    },
    "fr": {
      "question": "En tant que membre SPC+, dois-je renouveler mon adhésion chaque année ?",
      "answer": "Les membres SPC+ n'auront pas à renouveler leur adhésion. Tant que vous êtes admissible à un compte étudiant ou jeune de CIBC, vous recevrez automatiquement et gratuitement un nouveau numéro de membre SPC+ chaque année et vous pourrez continuer à profiter des avantages du programme SPC+!"
    }
  },
  {
    "en": {
      "question": "If I need support or have questions, where do I call?",
      "answer": "If you have any SPC-specific questions please send an email to <u>questions@spccard.ca</u>. For CIBC related questions, please contact our CIBC support line at 1-800-465-CIBC (2422) or visit a banking centre."
    },
    "fr": {
      "question": "Si j'ai besoin d'aide ou si j'ai des questions, où dois-je appeler?",
      "answer": "Si vous avez des questions, veuillez envoyer un courriel à <u>questions@spccard.ca</u>. Pour les questions relatives à CIBC, veuillez communiquer avec la ligne de soutien de la CIBC au 1-800-465-CIBC (2422) ou rendez-vous dans un centre bancaire."
    }
  }
]

export const MEMBERSHIP_FAQS = [
  {
    "en": {
      "question": "How do I activate my membership?",
      "answer": "To activate a digital membership purchased in-store or in school, please click <a href=" + domainURL + '/activate' + "> here </a> and enter your 16-digit membership # and CSV to begin. <br><br>You can also active your membership by following the instructions included inside your membership package.<br><br>Scan the QR Code inside the SPC package to begin the activation process. Scanning the QR code inside the package will direct you to a link for activation. Your 16-digit membership number will autopopulate, and all you’ll need to do is enter the CSV number found on the inside of the package."
    },
    "fr": {
      "question": "Comment puis-je activer mon adhésion ?",
      "answer": "Pour activer un adhésion numérique acheté en magasin ou à l'école, veuillez cliquer <a href=" + domainURL + '/activate' + "> ici </a> et saisir votre numéro d'adhésion à 16 chiffres et le CSV pour commencer. <br><br>Vous pouvez également activer votre adhésion en suivant les instructions incluses dans votre dossier d'adhésion. <br><br>Scannez le code QR à l'intérieur de l'emballage SPC pour commencer le processus d'activation. En scannant le code QR à l'intérieur du paquet, vous serez dirigé vers un lien d'activation. Votre numéro d'adhésion à 16 chiffres s'"
    }
  },
  {
    "en": {
      "question": "Does my membership expire?",
      "answer": "SPC memberships are valid for 1 year from the date you activate your membership, giving you 1 full year of discounts! Be sure to opt-in to auto-renew and add a payment option on file so that your membership will be automatically renewed every year. <br><br>If you purchase an SPC Membership online through our website or app, your membership will be automatically renewed at the end of the year."
    },
    "fr": {
      "question": "Mon adhésion expire-t-elle ?",
      "answer": "Les adhésions SPC sont valables un an à compter de la date d'activation de votre adhésion, ce qui vous donne droit à une année complète de réductions! Assurez-vous de choisir le renouvellement automatique et d'ajouter une option de paiement dans votre dossier afin que votre adhésion soit automatiquement renouvelée chaque année. <br><br>Si vous achetez une adhésion SPC en ligne via notre site web ou notre application, votre adhésion sera automatiquement renouvelée à la fin de l'année."
    }
  },
  {
    "en": {
      "question": "My membership is about to expire, how do I renew it?",
      "answer": "You can choose to have your membership automatically renewed every year. <br><br>To turn on auto renewal: <br> <ol> <li>Go into your profile and select <b>Manage Billing.</b></li><li> Under the <b>Manage Billing</b> section of your profile, make sure you <b>enable auto-renew.</b></li><li>Your selected method of payment will now be billed a membership fee at the end of the year, once your membership expires.</li><ol>"
    },
    "fr": {
      "question": "Mon adhésion est sur le point d'expirer, comment puis-je la renouveler ?",
      "answer": "Vous pouvez choisir de faire renouveler automatiquement votre adhésion chaque année. <br><br>Pour activer le renouvellement automatique : <br><ol> <li>Allez dans votre profil et sélectionnez <b>Gérer la facturation.</b></li> <li>Dans la section <b>Gérer la facturation</b> de votre profil, assurez-vous <b>d'activer la fonction activer le renouvellement automatique.</b></li>  <li>Le mode de paiement que vous avez choisi vous sera désormais facturé à la fin de l'année, à l'expiration de votre adhésion.</li> </ol>"
    }
  },
  {
    "en": {
      "question": "How do I cancel my membership from automatically renewing each year?",
      "answer": "If you no longer wish to receive SPC membership benefits, you can cancel your membership at any time. The cancellation of a SPC membership will go into effect at the end of your current billing cycle, and you will have the same level of access to membership services through the remainder of such billing cycle. <br><br>To cancel your membership: <br><ol><li>Go into your profile and select <b>Manage Billing</b>.</li> <li>Under the <b>Manage Billing</b> section of your profile, select <b>Cancel Renewal</b>.</li> <li>Confirm the changes to your membership on the screen. Your membership will then be deemed cancelled.</li></ol>"
    },
    "fr": {
      "question": "Comment puis-je annuler mon adhésion au renouvellement automatique chaque année ?",
      "answer": "Si vous ne souhaitez plus bénéficier des avantages de l'adhésion SPC, vous pouvez annuler votre adhésion à tout moment. L'annulation d'une adhésion SPC prendra effet à la fin de votre cycle de facturation actuel, et vous aurez le même niveau d'accès aux services d'adhésion pour le reste de ce cycle de facturation. <br><br>Pour annuler votre adhésion : <br><ol><li>Allez dans votre profil et sélectionnez <b>Gérer la facturation</b>.</li> <li>Dans la section <b>Gérer la facturation</b> de votre profil, sélectionnez <b>Annulez le renouvellement.</b></li> <li>Confirmez les modifications apportées à votre adhésion sur l'écran. Votre adhésion sera alors considérée comme annulée.</li> </ol>"
    }
  },
  {
    "en": {
      "question": "Can I share my SPC membership?",
      "answer": "The SPC membership cannot be shared. The membership is only valid for the student “account holder”. SPC partners have the right to refuse all discounts at their discretion in the case of suspected fraudulent or misuse of memberships."
    },
    "fr": {
      "question": "Puis-je partager mon adhésion SPC?",
      "answer": "L'adhésion SPC ne peut être partagée. L'adhésion n'est valable que pour l'étudiant 'titulaire du compte'. Les partenaires de SPC ont le droit de refuser toutes les remises à leur discrétion en cas de suspicion de fraude ou d'utilisation abusive des adhésions. "
    }
  },
  {
    "en": {
      "question": "I don’t want my SPC membership anymore. Can I get a refund?",
      "answer": "SPC memberships are non-refundable. "
    },
    "fr": {
      "question": "Je ne veux plus de mon adhésion SPC. Puis-je me faire rembourser? ",
      "answer": "Les adhésions SPC ne sont pas remboursables. "
    }
  },
  {
    "en": {
      "question": "What is a VIP SPC membership?",
      "answer": "SPC provides a limited quantity of VIP memberships to our partners and front-line staff to see the benefits of SPC! This membership is not for sale and cannot be renewed. VIP SPC memberships do not require student identification."
    },
    "fr": {
      "question": "Qu'est-ce qu'une adhésion VIP de SPC?",
      "answer": "SPC fournit une quantité limitée d'adhésions VIP à nos partenaires et au personnel de première ligne pour qu'ils puissent voir les avantages de SPC! Cette adhésion n'est pas à vendre et ne peut être renouvelée. Les adhésions VIP de SPC ne nécessitent pas de carte d'étudiant."
    }
  },
  {
    "en": {
      "question": "Where else can I buy a SPC Membership?",
      "answer": "You could become a member now by click <a href=" + domainURL + '/signup/account-creation' + ">here</a>. Packages with a digital membership could also be purchaed at select retail locations. if you would like to purchase a digital Membership check out https://www.spccard.ca/purchase/instore for a full list of where to get one! <br><br>Available at: <br> <ul><li>Select campus bookstores</li><li>Select high schools</li><li>Select retail locations</li></ul>"
    },
    "fr": {
      "question": "Où puis-je acheter une adhésion SPC ?",
      "answer": "Vous pouvez devenir membre dès maintenant en cliquant <a href=" + domainURL + '/signup/account-creation' + ">ici.</a> Les forfaits avec une adhésion numérique peuvent également être achetés dans certains points de vente. Si vous souhaitez acheter une adhésion numérique, consultez le site https://www.spccard.ca/purchase/instore pour obtenir la liste complète des points de vente ! <br><br>Disponible sur le site : <br><ul><li>Sélectionner les librairies du campus</li><li>Sélectionner les écoles secondaires</li><li>Sélection de sites de vente au détail</li></ul>"
    }
  },
  {
    "en": {
      "question": "I just bought a digital membership in-store, what do I need to do now?",
      "answer": "Thank you for your purchase! To get access to SPC membership benefits, you’ll need to activate your SPC Membership. <br><br>To activate a digital membership purchased in-store or in school, please click <a href=" + domainURL + '/activate' + ">here</a> and enter your 16-digit membership # and CSV to begin. You can also active your membership by following the instructions included inside your membership package. <br><br>Scan the QR Code inside the SPC package to begin the activation process. Scanning the QR code inside the package will direct you to a link for activation. Your 16-digit membership number will autogenerate, and all you’ll need to do is enter the CSV number found on the inside of the package."
    },
    "fr": {
      "question": "Je viens d'acheter un adhésion numérique en magasin, que dois-je faire maintenant ?",
      "answer": "Merci pour votre achat! Pour avoir accès aux avantages de l'adhésion SPC, vous devez activer votre adhésion SPC. <br><br>Pour activer un adhésion numérique acheté en magasin ou à l'école, veuillez cliquer <a href=" + domainURL + '/signup/account-creation' + ">ici.</a> et saisir votre numéro d' adhésion à 16 chiffres et le CSV pour commencer. <br><br>Vous pouvez également activer votre adhésion en suivant les instructions incluses dans votre dossier d'adhésion. <br><br>Scannez le code QR à l'intérieur de l'emballage SPC pour commencer le processus d'activation. En scannant le code QR à l'intérieur du paquet, vous serez dirigé vers un lien d'activation. Votre numéro de membre à 16 chiffres sera généré automatiquement, et tout ce que vous aurez à faire est d'entrer le numéro CSV qui se trouve à l'intérieur du paquet."
    }
  }
]

export const BFSE_FAQS = [
  {
    "en": {
      "question": "I bought SPC for someone else, when will they receive their membership?",
      "answer": "The recipient will receive their membership once you have placed your order. This is an automatic send and is not delayed. Please ensure that you have entered the correct email address for the recipient as the membership will get sent to the email address you provided."
    },
    "fr": {
      "question": "J'ai acheté une adhésion SPC pour quelqu'un d'autre, quand recevront-ils leur adhésion?",
      "answer": "Le destinataire recevra son abonnement une fois que vous aurez passé votre commande. Cet envoi est automatique et n'est pas différé. Veuillez-vous assurer que vous avez saisi la bonne adresse électronique pour le destinataire, car l'abonnement sera envoyé à l'adresse électronique que vous avez fournie."
    }
  },
  {
    "en": {
      "question": "The membership I bought for someone else has not arrived in their inbox yet, what do I do?",
      "answer": "The recipient of the SPC membership should first check their junk mail to make sure that the email sent from us did not land there. If it is not in their junk mail please reach out to <a href='mailto:questions@spccard.ca'>questions@spccard.ca</a> with your order number and order information and a Customer Service representative will gladly assist you"
    },
    "fr": {
      "question": "L'adhésion que j'ai achetée pour quelqu'un d'autre n'est pas encore arrivée dans sa boîte de réception, que dois-je faire?",
      "answer": "Le destinataire de l'adhésion SPC doit d'abord vérifier son courrier indésirable pour s'assurer que l'e-mail envoyé par nous n'y a pas atterri. S'il n'est pas dans son courrier indésirable, veuillez contacter <a href='mailto:questions@spccard.ca'>questions@spccard.ca</a> en indiquant votre numéro de commande et les informations relatives à la commande et un représentant du service clientèle se fera un plaisir de vous aider."
    }
  },
  {
    "en": {
      "question": "Where else could I buy SPC as a gift for someone?",
      "answer": `SPC memberships are also available for purchase at:
                 <ul>
                   <li>Select retail locations, click <a href='${domainURL}/purchase/instore'>here</a> for a full list of retailers.</li>
                   <li>Select campus bookstores</li>
                   <li>Select high schools</li>
                 </ul><br>
                 <strong>Note:</strong> All SPC memberships purchased are digital. You will need to download the SPC app to activate your SPC membership. If you already have an SPC account, <a href='${domainURL}/login'>log in</a> to activate your membership. New to SPC? <a href='${domainURL}/signup/account-creation'>Create an account</a> to activate your Membership.`
    },
    "fr": {
      "question": "Où pourrais-je acheter SPC comme cadeau pour quelqu'un?",
      "answer": `Les adhésions SPC sont également disponibles à l'achat sur le site:
                 <ul>
                   <li>Certains magasins. <a href='${domainURL}/purchase/instore'>Cliquez ici</a> pour la liste complète des détaillants.</li>
                   <li>Certaines librairies du campus</li>
                   <li>Certaines écoles secondaires</li>
                 </ul><br>
                 Les adhésions SPC sont au format numérique. <a href='${domainURL}/signup/account-creation'>Créez un compte</a> ou connectez-vous pour activer votre adhésion. Vous devrez télécharger l'application SPC pour utiliser votre adhésion SPC.`
    }
  },
  {
    "en": {
      "question": "Someone has purchased an SPC membership for me, what should I do next?",
      "answer": `Welcome to SPC! Click <a href='${domainURL}/signup'>here</a> to create your new account and activate your membership! Already have an SPC account? Click <a href='${domainURL}/login'>here</a> to log in to your existing account and add your 16-digit membership #.<br><br>
                 Download the SPC app for access to your membership, personalized deals, limited time offers and offers near you!`
    },
    "fr": {
      "question": "Quelqu'un m’a acheté une adhésion SPC, que dois-je faire pour l’utiliser?",
      "answer": `Bienvenue à SPC! <a href='${domainURL}/signup'>Cliquez ici</a> pour créer un nouveau compte et activer votre adhésion! Vous avez déjà un compte SPC? <a href='${domainURL}/login'>Cliquez ici</a> pour vous connecter à votre compte existant et activer votre numéro de d'adhésion à 16 chiffres.<br><br>
                 Téléchargez l'application SPC pour accéder à votre adhésion, à des offres personnalisées, à des offres à durée limitée et à des offres près de chez vous!`
    }
  },
  {
    "en": {
      "question": "I entered in the wrong recipient email when purchasing SPC for someone else, what can I do?",
      "answer": "Please reach out to <a href='mailto:questions@spccard.ca'>questions@spccard.ca</a> with your order number, and the correct recipient's email and we’ll have that fixed for you. "
    },
    "fr": {
      "question": "J'ai entré le mauvais e-mail du bénéficiaire lors de l'achat de SPC, que puis-je faire?",
      "answer": "Veuillez contacter <a href='mailto:questions@spccard.ca'>questions@spccard.ca</a> avec votre numéro de commande et la bonne adresse e-mail du bénéficiaire et nous réglerons le problème pour vous."
    }
  }
]

export const IAP_FAQS = [
  {
    "en": {
      "question": "How do I manage subscriptions on my iPhone, iPad, or iPod touch?",
      "answer": "<ol><li>Open the Settings app.</li><li> Tap your name.</li><li> Tap Subscriptions. (If you don't see \"Subscriptions,\" tap \"iTunes & App Store\" instead. Then tap your Apple ID, tap View Apple ID, sign in, scroll down to Subscriptions, and tap Subscriptions.) </li><li> Tap the subscription that you want to manage.</li></ol>"
    },
    "fr": {
      "question": "Comment gérer des abonnements sur votre iPhone, iPad ou iPod touch?",
      "answer": "<ol><li>Ouvrez l’app Réglages. </li><li> Touchez votre nom. </li><li> Touchez Abonnements. (Si vous ne voyez pas « Abonnements », touchez « iTunes et App Store » à la place. Touchez ensuite votre identifiant Apple, touchez Afficher l'identifiant Apple, connectez-vous, faites défiler jusqu'à Abonnements, puis touchez Abonnements.) </li><li> Touchez l’abonnement à gérer. </li></ol>"
    }
  },
  {
    "en": {
      "question": "How do I cancel my Apple subscription to SPC?",
      "answer": "<ol><li>Open the Settings app.</li><li> Tap your name. </li><li>Tap Subscriptions. (If you don't see \"Subscriptions,\" tap \"iTunes & App Store\" instead. Then tap your Apple ID, tap View Apple ID, sign in, scroll down to Subscriptions, and tap Subscriptions.) </li><li>Tap the subscription that you want to manage. </li><li> Tap Cancel Subscription. If you don’t see Cancel Subscription, the subscription is already canceled and won't renew.</li><ol>"
    },
    "fr": {
      "question": "Comment annuler l’abonnement Apple à SPC",
      "answer": "<ol><li>Ouvrez l’app Réglages.</li><li> Touchez votre nom. </li><li> Touchez Abonnements. (Si vous ne voyez pas « Abonnements », touchez « iTunes et App Store » à la place. Touchez ensuite votre identifiant Apple, touchez Afficher l'identifiant Apple, connectez-vous, faites défiler jusqu'à Abonnements, puis touchez Abonnements.) </li><li> Touchez l’abonnement à gérer. </li><li> Touchez Annuler l’abonnement. Si vous ne voyez pas l’option Annuler l’abonnement, ce dernier a déjà été annulé et ne sera pas renouvelé.</li><ol>"
    }
  },
  {
    "en": {
      "question": "I am using SPC Membership on an apple device, activated on iOS/Android/Web or purchased on Web/Android. How can I auto renew my membership?",
      "answer": "You can choose to have your membership automatically renewed every year. To turn on auto renewal, Login on Web, go into your profile and select Manage Billing. Under the manage billing section of your profile, make sure you enable auto renew."
    },
    "fr": {
      "question": "J'utilise l'adhésion SPC sur un appareil Apple, activé sur iOS / Android / Web ou acheté sur Web / Android. Comment puis-je renouveler automatiquement mon adhésion?",
      "answer": "Vous pouvez choisir de renouveler automatiquement votre adhésion chaque année. Pour activer le renouvellement automatique, connectez-vous sur le Web, accédez à votre profil et sélectionnez Renseignement de Paiements. Dans la section Renseignement de Paiements de votre profil, assurez-vous d'activer le renouvellement automatique."
    }
  },
  {
    "en": {
      "question": "Does my Apple subscription to SPC auto renew? ",
      "answer": "Yes, your subscription to SPC will auto renew through apple subscriptions one year from the date you purchased your subscription. If you cancel, you can keep using the subscription until the next billing date."
    },
    "fr": {
      "question": "Mon abonnement Apple à SPC se renouvelle-t-il automatiquement?",
      "answer": "Oui, votre abonnement à SPC se renouvellera automatiquement via les abonnements Apple un an à compter de la date d'achat de votre abonnement. Si vous annulez, vous pouvez continuer à utiliser l'abonnement jusqu'à la prochaine date de facturation."
    }
  },
  {
    "en": {
      "question": "Can I still access my membership from mobile web or desktop if I subscribe through Apple?",
      "answer": "Yes! If you’d like to view offers, manage your profile settings, or shop online you can still access SPC through mobile web and desktop. All in-store redemptions will still require you to show your SPC Digital App at checkout."
    },
    "fr": {
      "question": "Puis-je toujours accéder à mon adhésion à partir du Web mobile ou du bureau si je m'abonne via Apple?",
      "answer": "Oui! Si vous souhaitez voir les offres, gérer votre profil ou faire des achats en ligne, vous pouvez toujours accéder SPC via le Web mobile et le bureau. <br> Pour tous les achats en magasin, vous devrez toujours montrer votre adhésion numérique SPC sur l’appli à la caisse."
    }
  },
  {
    "en": {
      "question": "How can I manage my apple subscription if I dont have an Apple device?",
      "answer": "Use iTunes on your PC <br><br> <ol><li>On your PC, open iTunes. If you don't have iTunes,  <a href=" + "https://support.apple.com/en-us/HT210384" + "> download it. </a></li><li>From the menu bar at the top of the iTunes window, choose Account, then choose View My Account. You might be asked to sign in with your Apple ID.</li><li>Click View Account.</li><li>Scroll to the Settings section. Next to Subscriptions, click Manage.</li><li>Click Edit next to the subscription that you want.</li><li>Click Cancel Subscription. If you don’t see Cancel Subscription, then the subscription is already canceled and won't renew.</li></ol> <br> If you don't have a PC or an Apple device, you can cancel some subscriptions from Apple on other devices by contacting <a href=" + "https://getsupport.apple.com/?caller=kbase&PGF=PGF63006&category_id=SC0060&symptom_id=23208" + ">Apple Support.</a>"
    },
    "fr": {
      "question": "Comment gérer des abonnements Apple si vous ne possédez pas d’appareil Apple",
      "answer": "Utiliser iTunes sur votre PC <br><br> <ol><li>Sur votre PC, ouvrez iTunes. Si vous n'avez pas iTunes, <a href=" + "https://support.apple.com/fr-ca/HT210384" + "> téléchargez-le. </a></li><li>À partir de la barre de menus située en haut de la fenêtre iTunes, sélectionnez Comptes, puis Voir mon compte. Vous pourriez être invité à vous connecter à l’aide de votre identifiant Apple.</li><li>Cliquez sur Données du compte.</li><li>Accédez à la section Réglages. À côté d’Abonnements, cliquez sur Gérer.</li><li>Cliquez sur Modifier à côté de l’abonnement souhaité.</li><li>Cliquez sur Annuler l’abonnement. Si vous ne voyez pas l’option Annuler l’abonnement, ce dernier a déjà été annulé et ne sera pas renouvelé.</li></ol> <br> Si vous n'avez pas de PC ou d’appareil Apple, vous pouvez annuler des abonnements Apple sur d'autres appareils en <a href=" + "https://getsupport.apple.com/?caller=kbase&PGF=PGF63006&category_id=SC0060&symptom_id=23208" + ">contactant l’assistance Apple.</a>"
    }
  }
]

export const CIBC_BANKING_FAQS_PRELAUNCH = [
  {
    "en": {
      "question": "How can I receive the free CIBC/SPC membership?",
      "answer": "To be eligible for the free SPC membership you must be 14 years of age or older and hold an eligible CIBC youth or student bank account, student credit card or student line of credit at the time of registration or renewal of your membership. You can keep your membership as long as you hold any eligible CIBC Student or youth product."
    },
    "fr": {
      "question": "Comment puis-je recevoir une adhésion SPC CIBC gratuite?",
      "answer": "Afin d’être éligibles pour le programme, vous auriez besoin d’avoir 14 ans ou plus et être abonné à un compte bancaire étudiante ou pour les jeunes, une carte de crédit étudiante ou marge de crédit étudiante lorsque vous enregistrez ou renouvelez votre adhésion. Vous aurez accès à une adhésion SPC tant que vous êtes clients CIBC avec un produit ou service éligible."
    }
  },
  {
    "en": {
      "question": "Do I have to renew my CIBC/SPC membership?",
      "answer": "Your membership will be eligible for renewal every year as long as you hold an eligible CIBC student or youth product at the time of membership renewal."
    },
    "fr": {
      "question": "Dois-je renouveler mon adhésion SPC CIBC?",
      "answer": "Les clients possédant un produit ou service pour étudiants ou les jeunes CIBC éligibles recevront un renouvèlement automatique de leur adhésion SPC pourvu que vous ayez un produit ou service éligible lors de la période de renouvèlement."
    }
  },
  {
    "en": {
      "question": "If I need support or have questions where do I call?",
      "answer": "For CIBC related questions please contact our CIBC support line at 1-800-465-CIBC (2422) or visit CIBC banking centre."
    },
    "fr": {
      "question": "Qui dois-je appeler si j’ai besoin d’aide?",
      "answer": "Pour toutes enquêtes concernant CIBC, contactez leur équipe de support au 1-800-465-CIBC (2422) ou visitez votre succursale locale."
    }
  },
  {
    "en": {
      "question": "Which CIBC student or youth products are eligible for free SPC membership?",
      "answer": "If you hold one of the following products, you are eligible for an SPC membership:<br><br>CIBC Aventura Visa Card for Students<br>CIBC Aero Platinum Visa Card for Students<br>CIBC Dividend Visa Card for Students<br>CIBC Classic Visa Card for Students<br>CIBC Tim Hortons Double Double Visa Card for Students<br>Education Line of Credit<br>Professional Edge Student Line of Credit<br>Student Smart Account or Student Advantage Account<br>Advantage Account for Youth<br>Professional Smart Account for Students"
    },
    "fr": {
      "question": "Quels produits CIBC pour étudiants ou les jeunes sont éligibles de bénéficier d’une adhésion SPC gratuite?",
      "answer": "Vous êtes éligibles de recevoir une adhésion SPC gratuite si vous avez un des produits suivants :<br><br>Carte Aventura CIBC Visa pour étudiants <br>Carte Aéro Platine CIBC Visa pour étudiants<br>Carte Dividendes CIBC Visa pour étudiants<br>Carte Classique CIBC Visa pour étudiants<br>Carte Visa Tandem CIBC Tim Hortons pour étudiants<br>Marge de crédit pour études <br>Marge de crédit de classe professionnels <br>Compte Intelli CIBC pour étudiants ou compte avantage CIBC pour étudiants <br>Compte avantage CIBC pour les jeunes<br>Compte Intelli CIBC pour étudiants professionnels"
    }
  }
]

export const CIBC_BANKING_FAQS = [
  {
    "en": {
      "question": "How do I register and use my SPC digital membership?",
      "answer": "Register online at cibc.com/spc.  Click the “Register for SPC” button. You’ll be transferred to the SPC site to complete your digital card’s registration Once registered, you’ll be sent an email from SPC confirming your registration. Download the SPC app to your phone and show your digital membership and student ID at participating stores or use it when shopping online."
    },
    "fr": {
      "question": "Comment puis-je enregistrer et utiliser mon adhésion SPC numérique?",
      "answer": "Soumettez votre demande en ligne à cibc.com/spc. Sélectionnez le bouton « Enregistrez-vous pour SPC ». Vous serez ensuite redirigé au site SPC afin de compléter l’enregistrement de votre adhésion. Une fois enregistré, vous recevrez un courriel confirmant votre enregistrement. Téléchargez l’application SPC afin de montrer votre adhésion numérique et identité étudiante en magasin afin d’économiser en magasin et en ligne."
    }
  },
  {
    "en": {
      "question": "How can I receive the free CIBC/SPC membership?",
      "answer": "To be eligible for the free SPC membership you must be 14 years of age or older and hold an eligible CIBC youth or student bank account, student credit card or student line of credit at the time of registration or renewal of your membership. You can keep your membership as long as you hold any eligible CIBC Student or youth product."
    },
    "fr": {
      "question": "Comment puis-je recevoir une adhésion SPC CIBC gratuite?",
      "answer": "Afin d’être éligibles pour le programme, vous auriez besoin d’avoir 14 ans ou plus et être abonné à un compte bancaire étudiante ou pour les jeunes, une carte de crédit étudiante ou marge de crédit étudiante lorsque vous enregistrez ou renouvelez votre adhésion. Vous aurez accès à une adhésion SPC tant que vous êtes clients CIBC avec un produit ou service éligible."
    }
  },
  {
    "en": {
      "question": "Which CIBC student or youth products are eligible for free SPC membership?",
      "answer": "If you hold one of the following products, you are eligible for an SPC membership:<br><br>CIBC Aventura Visa Card for Students<br>CIBC Aero Platinum Visa Card for Students<br>CIBC Dividend Visa Card for Students<br>CIBC Classic Visa Card for Students<br>CIBC Tim Hortons Double Double Visa Card for Students<br>Education Line of Credit<br>Professional Edge Student Line of Credit<br>Student Smart Account or Student Advantage Account<br>Advantage Account for Youth<br>Professional Smart Account for Students"
    },
    "fr": {
      "question": "Quels produits CIBC pour étudiants ou les jeunes sont éligibles de bénéficier d’une adhésion SPC gratuite?",
      "answer": "Vous êtes éligibles de recevoir une adhésion SPC gratuite si vous avez un des produits suivants :<br><br>Carte Aventura CIBC Visa pour étudiants <br>Carte Aéro Platine CIBC Visa pour étudiants<br>Carte Dividendes CIBC Visa pour étudiants<br>Carte Classique CIBC Visa pour étudiants<br>Carte Visa Tandem CIBC Tim Hortons pour étudiants<br>Marge de crédit pour études <br>Marge de crédit de classe professionnels <br>Compte Intelli CIBC pour étudiants ou compte avantage CIBC pour étudiants <br>Compte avantage CIBC pour les jeunes<br>Compte Intelli CIBC pour étudiants professionnels"
    }
  },
  {
    "en": {
      "question": "Do I have to renew my CIBC/SPC membership?",
      "answer": "Your membership will be eligible for renewal every year as long as you hold an eligible CIBC student or youth product at the time of membership renewal."
    },
    "fr": {
      "question": "Dois-je renouveler mon adhésion SPC CIBC?",
      "answer": "Les clients possédant un produit ou service pour étudiants ou les jeunes CIBC éligibles recevront un renouvèlement automatique de leur adhésion SPC pourvu que vous ayez un produit ou service éligible lors de la période de renouvèlement."
    }
  },
  {
    "en": {
      "question": "If I need support or have questions where do I call?",
      "answer": "If you have any SPC-specific questions please send an email to <a href=" + 'mailto:' + questionsEmail + ">" + questionsEmail + "</a>. For CIBC related questions please contact our CIBC support line at 1-800-465-CIBC (2422) or visit a banking centre."
    },
    "fr": {
      "question": "Qui dois-je appeler si j’ai besoin d’aide?",
      "answer": "Si vous avez des questions concernant votre adhésion SPC, envoyez un courriel au <a href=" + 'mailto:' + questionsEmail + ">" + questionsEmail + "</a>. Pour toutes enquêtes CIBC, contactez leur équipe de support au 1-800-465-CIBC (2422) ou visitez votre succursale locale."
    }
  }
]

export const FREE_TRIAL_FAQS = [
  {
    "en": {
      "question": "How do I redeem a discount in-store?",
      "answer": "Using SPC in-store is simple and easy! Open the SPC app and tap the membership icon from the bottom menu to display your digital membership. Once at checkout just show your digital membership to the staff. You can also tilt your device to the side for quick access to your digital membership. <br>You can also acess your digital membership on mobile web, just make sure you’re logged into your SPC Account. The membership icon will appear beside the searchbar once you’re logged in"
    },
    "fr": {
      "question": "Comment faire valoir une réduction en magasin ?",
      "answer": "L'utilisation de SPC en magasin est simple et facile! <br> Ouvrez l'application SPC et appuyez sur l'icône d'adhésion dans le menu inférieur pour afficher votre adhésion numérique. Une fois à la caisse, montrez simplement votre adhésion numérique au personnel. Vous pouvez également incliner votre appareil sur le côté pour accéder rapidement à votre carte de membre numérique. <br>Vous pouvez également accéder à votre adhésion numérique sur le web mobile, assurezvous simplement d'être connecté à votre compte SPC. L'icône d'adhésion apparaîtra à côté de la barre de recherche une fois que vous serez connecté"
    }
  },
  {
    "en": {
      "question": "How do I redeem a discount online?",
      "answer": "If you're shopping on the SPC online, Head over to the <a href=" + domainURL + '/deals' + ">deals</a> page and search your favourite online offer. Once you have your discount open, click the <b>REDEEM ONLINE</b> button, to copy your code and be redirected to the partner website. If you're shopping through the SPC app, open up your favourite online discount and tap <b>REDEEM ONLINE</b>. You’ll be redirected to the partner website, make sure to tap <b>COPY CODE</b> At the bottom of the page to copy your code. Note some SPC online offers don’t require a promo code, in these situations you won’t need to copy a code."
    },
    "fr": {
      "question": "Comment puis-je profiter d'une offre en ligne ?",
      "answer": "Si vous faites des achats sur le site web du SPC, rendez-vous sur la page des <a href=" + domainURL + '/deals' + ">offres</a> et sélectionnez votre offre en ligne préférée. Une fois votre offre ouverte, cliquez sur le bouton <b>ÉCHANGEZ EN LIGNE.</b>, pour copier votre code et être redirigé vers le site web du partenaire. Si vous faites vos achats sur l'application SPC, ouvrez votre offre en ligne préférée et appuyez sur REDEEM ONLINE. Vous serez redirigé vers le site web du partenaire, assurez-vous de cliquer sur COPIER LE CODE en bas de la page pour copier votre code. Notez que certaines offres en ligne de SPC ne nécessitent pas de code promotionnel, dans ces situations, vous n'aurez pas besoin de copier un code."
    }
  },
  {
    "en": {
      "question": "What do I do if my promo code isn’t working or if a store didn’t honour the SPC offer?",
      "answer": "Send us an email at <a href=" + 'mailto:' + questionsEmail + ">" + questionsEmail + "</a> with as much information as possible and we will look into a solution for your right away! Please have your account information ready."
    },
    "fr": {
      "question": "Que dois-je faire si mon code promotionnel ne fonctionne pas ou si un magasin n'a pas honoré l'offre SPC ?",
      "answer": "Envoyez-nous un e-mail à <a href=" + 'mailto:' + questionsEmail + ">" + questionsEmail + "</a> avec le plus d'informations possibles et nous étudierons immédiatement une solution pour vous ! Veuillez préparer les informations relatives à votre compte."
    }
  }
]

export const APP_QUESTIONS_FAQS = [
  {
    "en": {
      "question": " I can’t log in to my account.",
      "answer": "Be sure you’re using the same email and password you used the first time you created your account.<br> If this doesn’t work, please reach out to us at <a href=" + 'mailto:' + questionsEmail + ">" + questionsEmail + "</a> with your 16-digit SPC Membership number starting with 6018 and we’ll be happy to help!"
    },
    "fr": {
      "question": " Je ne peux pas me connecter à mon compte.",
      "answer": "Assurez-vous que vous utilisez le même courriel et le même mot de passe que la première fois que vous avez créé votre compte.<br>Si cela ne fonctionne pas, veuillez nous contacter à l'adresse <a href=" + 'mailto:' + questionsEmail + ">" + questionsEmail + "</a> en indiquant votre numéro de membre du SPC à 16 chiffres commençant par 6018 et nous serons heureux de vous aider !"
    }
  },
  {
    "en": {
      "question": "I don’t have wifi or data, can i still use my SPC app in-store?",
      "answer": "Yes! The SPC app has an offline mode that allows you to browse offers, and access your digital membership screen to redeem offers in-store."
    },
    "fr": {
      "question": "Je n'ai pas de wifi ou de données, puis-je quand même utiliser mon application SPC en magasin ?",
      "answer": "Oui ! L'application SPC dispose d'un mode hors ligne qui vous permet de parcourir les offres et d'accéder à votre écran d'adhésion numérique pour échanger des offres en magasin."
    }
  },
  {
    "en": {
      "question": "I don't have a smartphone, can I still use SPC?",
      "answer": "To receive full SPC member benefits you’ll need to download the SPC app on a smartphone. In order to redeem in-store offers you must show your active SPC membership through the SPC app. Don’t have a smartphone? We still have over 150 online offers for you to choose from!"
    },
    "fr": {
      "question": "Je n'ai pas de smartphone, puis-je quand même utiliser l'application SPC ?",
      "answer": "Pour bénéficier de tous les avantages d'un membre du SPC, vous devez télécharger l'application SPC sur un smartphone. Pour pouvoir utiliser les offres en magasin, vous devez montrer votre adhésion active au SPC par le biais de l'application SPC. Vous n'avez pas de smartphone ? Nous avons encore plus de 150 offres en ligne à vous proposer !"
    }
  },
  {
    "en": {
      "question": "My app isn’t working",
      "answer": "If you're having issues with the SPC app, please check to see if you have the latest version of the app. If you’re still having an issue with the newest app release, send us an email and we’ll be happy to help. Please include What type of device you're on (Android or iOS), What version you're using, and a brief description of the issue. We’ll get back to you with a solution!"
    },
    "fr": {
      "question": "Mon application ne fonctionne pas ",
      "answer": "Si vous avez des problèmes avec l'application SPC, veuillez vérifier si vous avez la dernière version de l'application. Si vous avez toujours un problème avec la dernière version de l'application, envoyez-nous un courriel et nous serons heureux de vous aider. Veuillez indiquer le type d'appareil sur lequel vous vous trouvez (Android ou iOS), la version que vous utilisez et une brève description du problème. Nous vous proposerons une solution !"
    }
  }
]

export const SPC_PLUS_QUESTIONS = [
  {
    "en": {
      "question": "What is an SPC+ membership?",
      "answer": "SPC+ is a membership through the partnership between CIBC and SPC that provides eligible student and youth clients with a free SPC+ membership and exclusive access to better discounts, special experiences, giveaways and more. SPC+ membership is inclusive of the overall SPC program benefits such as access to over 450 offers providing instant student savings of up to 30% off. Students with SPC+ save an average of $340 each year."
    },
    "fr": {
      "question": "Qu'est-ce qu'une adhésion SPC+?",
      "answer": "SPC+ est une adhésion issue du partenariat entre CIBC et SPC qui permet aux étudiants et aux jeunes clients admissibles d'adhérer gratuitement à SPC+ et d'avoir un accès exclusif à de meilleurs rabais, à des expériences spéciales, à des cadeaux et plus encore. L'adhésion SPC+ comprend les avantages du programme SPC dans son ensemble, comme l'accès à plus de 450 offres permettant aux étudiants d'économiser instantanément jusqu'à 30%. Les étudiants bénéficiant de l'adhésion SPC+ économisent en moyenne 340 $ par an"
    }
  },
  {
    "en": {
      "question": "How do I get an SPC+ membership?",
      "answer": "Easy! Eligible CIBC student and youth clients can visit <a href=" + domainURL + '/cibc' + ">CIBC.com/SPC</a> and click the “Register for free SPC+” button to complete registration and receive their free SPC+ membership. If you have any questions, please contact CIBC support line at 1.800.465.2422"
    },
    "fr": {
      "question": "Comment puis-je obteenir une adhésion SPC+?",
      "answer": "C'est facile ! Les étudiants et les jeunes clients admissibles de CIBC peuvent visiter le site <a href=" + domainURL + '/cibc' + ">CIBC.com/SPC</a> et cliquer sur le bouton “Inscription gratuite à SPC” pour compléter l'inscription et recevoir leur adhésion SPC+ gratuite. Si vous avez des questions, veuillez communiquer avec la ligne d'assistance CIBC au 1.800.465.2422."
    }
  },
  {
    "en": {
      "question": "I don’t know if I qualify. What services apply for student and youth products?",
      "answer": "Not sure if you qualify? Please visit <a href=" + domainURL + '/cibc' + ">CIBC.com/SPC</a> or contact CIBC support line at 1-800-465-2422 and they will be more than happy to help eligible clients register for their free SPC+ membership. <br><br>Don’t qualify? Easy fix! A CIBC representative will be able to help find all eligible clients a product or service that is better suited for your needs – plus you will get a free SPC+ membership.  "
    },
    "fr": {
      "question": "Je ne sais pas si je suis admissible. Quels services sont admissibles à titre de produits pour étudiants et jeunes CIBC?",
      "answer": "Vous ne savez pas si vous êtes admissible? Visitez <a href=" + domainURL + '/cibc' + ">CIBC.com/SPC</a> ou communiquer avec la ligne de soutien de CIBC au 1 800-465-2422 et ils se feront un plaisir d'aider les clients admissibles à s'inscrire à leur adhésion SPC+ gratuite. <br><br>Vous n'êtes pas admissible? C'est facile! Un représentant de CIBC pourra aider tous les clients admissibles à trouver un produit ou un service mieux adapté à leurs besoins - et vous obtiendrez une adhésion SPC+ gratuite. "
    }
  },
  {
    "en": {
      "question": "How do I register and use my SPC+ digital membership?",
      "answer": "Register online at <a href=" + domainURL + '/cibc' + ">CIBC.com/SPC</a>. Click the “Register for free SPC+” button. You’ll be transferred to the SPC site to complete your digital card’s registration Once registered, you’ll be sent an email from SPC confirming your registration. Download the SPC app to your phone and show your digital membership and student ID at participating stores or use it when shopping online."
    },
    "fr": {
      "question": "Comment puis-je m'inscrire et utiliser mon abonnement numérique SPC+ ?",
      "answer": "Inscrivez-vous en ligne à <a href=" + domainURL + '/cibc' + ">CIBC.com/SPC</a>. Cliquez sur le bouton 'inscription gratuite à SPC+'. Vous serez transféré sur le site SPC pour compléter l'inscription de votre carte numérique. Une fois inscrit, vous recevrez un courriel de SPC confirmant votre inscription. Téléchargez l'application SPC sur votre téléphone et montrez votre carte numérique et votre carte d'étudiant dans les magasins participants ou utilisez-la pour vos achats en ligne."
    }
  },
  {
    "en": {
      "question": "If I need support or have questions where do I call?",
      "answer": "If you have any SPC-specific questions please send an email to <a href='mailto:questions@spccard.ca'>questions@spccard.ca</a>. For CIBC related questions please contact our CIBC support line at 1-800-465-CIBC (2422) or visit a banking centre."
    },
    "fr": {
      "question": "Si j'ai besoin d'aide ou si j'ai des questions, où dois-je appeler?",
      "answer": "Si vous avez des questions, veuillez envoyer un courriel à <a href='mailto:questions@spccard.ca'>questions@spccard.ca</a>. Pour les questions relatives à CIBC, veuillez communiquer avec la ligne de soutien de la CIBC au 1-800-465-CIBC (2422) ou rendez-vous dans un centre bancaire. "
    }
  },
  {
    "en": {
      "question": "Can I get my free SPC+ membership at any SPC-participating retailer as a CIBC client?",
      "answer": "No, if you are an eligible CIBC client you must register through the CIBC webpage <u>cibc.com/spc</u> to receive a free SPC+ digital membership."
    },
    "fr": {
      "question": "Puis-je obtenir mon adhésion SPC+ gratuite chez n'importe quel détaillant participant à SPC en tant que client de CIBC ?",
      "answer": "Non, si vous êtes un client admissible de CIBC, vous devez vous inscrire sur la page Web CIBC <u>cibc.com/spc</u> pour recevoir un adhésion numérique SPC+ gratuite"
    }
  },
  {
    "en": {
      "question": "How much is the SPC+ membership?",
      "answer": "The membership is FREE! Open an eligible product with CIBC to qualify. All you have to go is visit CIBC.com/SPC and click the sign-up option to go through your CIBC registration process to receive your FREE SPC+ membership number! If you have any questions, please contact 1.800.465.2422"
    },
    "fr": {
      "question": "Combien coûte l'adhésion SPC+?",
      "answer": "L'adhésion est GRATUITE! Ouvrez un produit admissible auprès de CIBC pour être admissible. Il vous suffit de vous rendre sur le site CIBC.com/SPC et de cliquer sur l'option d'inscription pour suivre le processus d'inscription à CIBC et recevoir votre numéro de membre SPC+ GRATUIT! Si vous avez des questions, veuillez communiquer avec le 1.800.465.2422."
    }
  }
]

export const HOW_IT_WORKS_FAQ = [
  {
    "en": {
      "question": "Is SPC only for students?",
      "answer": "YES! SPC is a student-exclusive membership. All students are eligible to receive discounts and deals but may be required to show valid student ID when redeeming offers. We’ve made life easy- store your student ID right in the SPC app for ease of access when showing your membership in-store. <br> Due to privacy reasons, students under 13 are not eligible for an SPC membership."
    },
    "fr": {
      "question": "SPC est-il réservé aux étudiants ?",
      "answer": "OUI! SPC est une adhésion exclusivement destinée aux étudiants. Tous les étudiants sont éligibles pour bénéficier de remises et d'offres, mais il est possible qu'il leur soit demandé de présenter une carte d'étudiant valide afin de pouvoir bénéficier des offres. Pour faciliter le processus, nous mettons à votre disposition votre carte d'étudiant dans l'application SPC afin de pouvoir la présenter facilement en magasin. <br>Pour des raisons de confidentialité, les élèves de moins de 13 ans ne sont pas éligibles pour une adhésion SPC. "
    }
  },
  {
    "en": {
      "question": "How do I activate my membership?",
      "answer": "To activate a digital membership purchased in-store or in school, please click <a href=" + domainURL + '/activate' + "> here </a> and enter your 16-digit membership # and CSV to begin. <br><br>You can also active your membership by following the instructions included inside your membership package.<br><br>Scan the QR Code inside the SPC package to begin the activation process. Scanning the QR code inside the package will direct you to a link for activation. Your 16-digit membership number will autopopulate, and all you’ll need to do is enter the CSV number found on the inside of the package."
    },
    "fr": {
      "question": "Comment puis-je activer mon adhésion ?",
      "answer": "Pour activer un adhésion numérique acheté en magasin ou à l'école, veuillez cliquer <a href=" + domainURL + '/activate' + "> ici </a> et saisir votre numéro d'adhésion à 16 chiffres et le CSV pour commencer. <br><br>Vous pouvez également activer votre adhésion en suivant les instructions incluses dans votre dossier d'adhésion. <br><br>Scannez le code QR à l'intérieur de l'emballage SPC pour commencer le processus d'activation. En scannant le code QR à l'intérieur du paquet, vous serez dirigé vers un lien d'activation. Votre numéro d'adhésion à 16 chiffres s'"
    }
  },
  {
    "en": {
      "question": "Do I need to show student I.D.?",
      "answer": "Students 16+ may be requested to present valid student identification to receive their discount. SPC partners have the right to refuse any discount if valid student ID is not provided, with the exceptions of a VIP membership and SPC+/CIBC memberships. <br> Be sure to upload your student ID in the SPC app to take it with you, everywhere you go!"
    },
    "fr": {
      "question": "Dois-je présenter une carte d'étudiant? ",
      "answer": "Les étudiants de plus de 16 ans peuvent être invités à présenter une carte d'étudiant valide pour bénéficier de leur réduction. Les partenaires de SPC ont le droit de refuser toute réduction si une carte d'étudiant valide n'est pas fournie, à l'exception des adhésions VIP et des adhésions SPC+/CIBC. <br> N'oubliez pas de télécharger votre carte d'étudiant dans l'application SPC pour l'emporter avec vous, partout où vous allez! "
    }
  },
  {
    "en": {
      "question": "I don't have a smartphone, can I still use SPC?",
      "answer": "To receive full SPC member benefits you’ll need to download the SPC app on a smartphone. In order to redeem in-store offers you must show your active SPC membership through the SPC app. Don’t have a smartphone? We still have over 150 online offers for you to choose from!"
    },
    "fr": {
      "question": "Je n'ai pas de smartphone, puis-je quand même utiliser l'application SPC ?",
      "answer": "Pour bénéficier de tous les avantages d'un membre du SPC, vous devez télécharger l'application SPC sur un smartphone. Pour pouvoir utiliser les offres en magasin, vous devez montrer votre adhésion active au SPC par le biais de l'application SPC. Vous n'avez pas de smartphone ? Nous avons encore plus de 150 offres en ligne à vous proposer !"
    }
  },
  {
    "en": {
      "question": "Does my membership expire?",
      "answer": "SPC memberships are valid for 1 year from the date you activate your membership, giving you 1 full year of discounts! Be sure to opt-in to auto-renew and add a payment option on file so that your membership will be automatically renewed every year. <br><br>If you purchase an SPC Membership online through our website or app, your membership will be automatically renewed at the end of the year."
    },
    "fr": {
      "question": "Mon adhésion expire-t-elle ?",
      "answer": "Les adhésions SPC sont valables un an à compter de la date d'activation de votre adhésion, ce qui vous donne droit à une année complète de réductions! Assurez-vous de choisir le renouvellement automatique et d'ajouter une option de paiement dans votre dossier afin que votre adhésion soit automatiquement renouvelée chaque année. <br><br>Si vous achetez une adhésion SPC en ligne via notre site web ou notre application, votre adhésion sera automatiquement renouvelée à la fin de l'année."
    }
  },
  {
    "en": {
      "question": "I just bought a digital membership in-store, what do I need to do now?",
      "answer": "Thank you for your purchase! To get access to SPC membership benefits, you’ll need to activate your SPC Membership. <br><br>To activate a digital membership purchased in-store or in school, please click <a href=" + domainURL + '/activate' + ">here</a> and enter your 16-digit membership # and CSV to begin. You can also active your membership by following the instructions included inside your membership package. <br><br>Scan the QR Code inside the SPC package to begin the activation process. Scanning the QR code inside the package will direct you to a link for activation. Your 16-digit membership number will autogenerate, and all you’ll need to do is enter the CSV number found on the inside of the package."
    },
    "fr": {
      "question": "Je viens d'acheter un adhésion numérique en magasin, que dois-je faire maintenant ?",
      "answer": "Merci pour votre achat! Pour avoir accès aux avantages de l'adhésion SPC, vous devez activer votre adhésion SPC. <br><br>Pour activer un adhésion numérique acheté en magasin ou à l'école, veuillez cliquer <a href=" + domainURL + '/signup/account-creation' + ">ici.</a> et saisir votre numéro d' adhésion à 16 chiffres et le CSV pour commencer. <br><br>Vous pouvez également activer votre adhésion en suivant les instructions incluses dans votre dossier d'adhésion. <br><br>Scannez le code QR à l'intérieur de l'emballage SPC pour commencer le processus d'activation. En scannant le code QR à l'intérieur du paquet, vous serez dirigé vers un lien d'activation. Votre numéro de membre à 16 chiffres sera généré automatiquement, et tout ce que vous aurez à faire est d'entrer le numéro CSV qui se trouve à l'intérieur du paquet."
    }
  },
  {
    "en": {
      "question": "I bought SPC for someone else, when will they receive their membership?",
      "answer": "The recipient will receive their membership once you have placed your order. This is an automatic send and is not delayed. Please ensure that you have entered the correct email address for the recipient as the membership will get sent to the email address you provided."
    },
    "fr": {
      "question": "J'ai acheté une adhésion SPC pour quelqu'un d'autre, quand recevront-ils leur adhésion?",
      "answer": "Le destinataire recevra son abonnement une fois que vous aurez passé votre commande. Cet envoi est automatique et n'est pas différé. Veuillez-vous assurer que vous avez saisi la bonne adresse électronique pour le destinataire, car l'abonnement sera envoyé à l'adresse électronique que vous avez fournie."
    }
  },
  {
    "en": {
      "question": "How do I get an SPC+ membership?",
      "answer": "Easy! Eligible CIBC student and youth clients can visit <a href=" + domainURL + '/cibc' + ">CIBC.com/SPC</a> and click the “Register for free SPC+” button to complete registration and receive their free SPC+ membership. If you have any questions, please contact CIBC support line at 1.800.465.2422"
    },
    "fr": {
      "question": "Comment puis-je obteenir une adhésion SPC+?",
      "answer": "C'est facile ! Les étudiants et les jeunes clients admissibles de CIBC peuvent visiter le site <a href=" + domainURL + '/cibc' + ">CIBC.com/SPC</a> et cliquer sur le bouton “Inscription gratuite à SPC” pour compléter l'inscription et recevoir leur adhésion SPC+ gratuite. Si vous avez des questions, veuillez communiquer avec la ligne d'assistance CIBC au 1.800.465.2422."
    }
  }
]

export const HUDSONS_BAY_FAQ = [
  {
    "en": {
      "question": "How do I link my Hudson’s Bay Rewards and SPC Membership accounts?",
      "answer": "Visit spccard.ca/hudsonsbay. Once signed in, input your 15-digit Hudson’s Bay Rewards account number in the field provided and submit. You will receive a confirmation message that your accounts have been linked. <br /><br />Twenty-four (24) hours after linking your Hudson’s Bay Rewards and SPC Membership accounts, you will be eligible to earn 15% back in Hudson’s Bay Rewards points value on eligible transactions made at Hudson’s Bay in-store and thebay.com."
    },
    "fr": {
      "question": "Comment puis-je lier mon compte Primes La Baie d’Hudson et mon compte SPC?",
      "answer": "Visitez le spccard.ca/hudsonsbay. Une fois la connexion établie, entrez votre numéro de compte Primes La Baie d’Hudson à 15 chiffres dans le champ prévu à cet effet et cliquez sur Soumettre. Vous recevrez un message confirmant que vos comptes ont été liés. <br /><br /> Vingt-quatre (24) heures après avoir lié votre compte Primes La Baie d’Hudson et votre compte SPC, vous aurez droit à 15 % de remises en points Primes La Baie d’Hudson sur les transactions admissibles effectuées en magasin et à labaie.com."
    }
  },
  {
    "en": {
      "question": "How do I earn 15% back in Hudson’s Bay Rewards points value?",
      "answer": "Twenty-four (24) hours after your Hudson’s Bay Rewards and SPC Membership accounts have been linked, simply identify yourself as a Hudson’s Bay Rewards member before you complete an eligible transaction at Hudson’s Bay or thebay.com. <br /><br />&nbsp;&nbsp; a. In-store: provide the associate with your Hudson’s Bay Rewards account number, phone number, or email address associated with your account.<br />&nbsp;&nbsp; b. Online: simply log-in to your account at thebay.com.<br /><br />Note: If you’re paying with your Hudson’s Bay Mastercard online or in-store, you’ll automatically earn the extra points as your Hudson’s Bay Mastercard and Hudson’s Bay Rewards accounts are linked."
    },
    "fr": {
      "question": "Comment puis-je obtenir 15 % de remises en points Primes La Baie d’Hudson?",
      "answer": "Vingt-quatre (24) heures après la liaison de votre compte Primes La Baie d’Hudson à votre compte SPC, il suffira de montrer que vous êtes membre Primes La Baie d’Hudson avant d’effectuer une transaction en magasin ou à labaie.com.<br/><br/>&nbsp;&nbsp; a. En magasin : Fournissez à l’associé[e] votre numéro de compte Primes La Baie d’Hudson, ou encore le numéro de téléphone ou l’adresse courriel associés à votre compte.<br />&nbsp;&nbsp; b. En ligne : Vous n’avez qu’à vous connecter à votre compte labaie.com. <br /><br />Remarque : Si vous payez avec la carte Mastercard La Baie d’Hudson en magasin ou en ligne, vous accumulerez automatiquement des points bonis, car votre compte Primes et votre carte Mastercard La Baie d’Hudson sont liés."
    }
  },
  {
    "en": {
      "question": "How soon after making a purchase will I receive my Hudson’s Bay Rewards bonus points?",
      "answer": "In-store: Points earned will be issued instantly upon completion of an eligible transaction; and will appear on the member’s receipt and in the member’s Hudson’s Bay Rewards account online and in-app.<br /><br /> Online: Points earned will be issued within twenty-four (24) hours of the eligible item(s) being shipped; and will appear in the member’s Hudson’s Bay Rewards account online and in-app."
    },
    "fr": {
      "question": "Combien de temps après avoir effectué un achat recevrai-je mes points Primes La Baie d’Hudson bonis?",
      "answer": "En magasin : Les points seront émis instantanément à la fin d’une transaction admissible et figureront sur le reçu du membre et dans son compte Primes La Baie d’Hudson en ligne et dans l’application.<br /><br />En ligne : Les points seront émis dans les vingt-quatre (24) heures suivant l’expédition des articles admissibles et figureront sur le compte Primes La Baie d’Hudson du membre en ligne et dans l’application."
    }
  },
  {
    "en": {
      "question": "How do I take advantage of promotional in-store offers for SPC members?",
      "answer": "From time to time, Hudson’s Bay Rewards may extend in-store discount offers to SPC members. These offers and associated details will be communicated at spccard.ca or the SPC app. Simply show proof of SPC Membership when making an eligible in-store purchase. You may also be asked to show your student ID."
    },
    "fr": {
      "question": "Comment les membres SPC peuvent-ils profiter des offres promotionnelles en magasin?",
      "answer": "De temps à autre, le programme Primes La Baie d’Hudson peut proposer des offres de rabais en magasin aux membres SPC. Vous trouverez toutes les précisions sur ces offres sur le site spccard.ca et dans l’application SPC. Vous n’avez qu’à montrer une preuve de votre adhésion SPC en effectuant un achat admissible en magasin. Il est également possible que l’on vous demande de présenter votre carte d’étudiant"
    }
  },
  {
    "en": {
      "question": "Do Hudson’s Bay Rewards points and discount offers for SPC members apply to purchases made at Zellers?",
      "answer": "No, Zellers is excluded from the offer."
    },
    "fr": {
      "question": "Les points Primes La Baie d’Hudson et les rabais offerts aux membres SPC appliquent-ils aux achats effectués chez Zellers?",
      "answer": "Non, les articles vendus par Zellers sont exclus de cette offre."
    }
  }
]



// WEBPACK FOOTER //
// ./src/assets/localized/ca/data/faqs.js