import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  zh: {
    translation: {
      "common": {
        "cancel": "取消",
        "save": "儲存變更",
        "loading": "載入中...",
        "processing": "處理中...",
        "submit": "提交",
        "back": "上一步",
        "next": "下一步",
        "confirm": "確認",
        "edit": "編輯",
        "delete": "刪除",
        "verified": "已實名認證",
        "unverified": "認證待補",
        "status": "狀態"
      },
      "nav": {
        "findTrips": "探索行程",
        "createTrip": "發布請求",
        "dashboard": "我的儀表板",
        "login": "登入 / 註冊",
        "account": "我的帳戶",
        "howItWorks": "服務流程"
      },
      "home": {
        "hero": {
          "title1": "讓每一段旅程都有人陪伴，",
          "title2": "讓每一份擔心都能放下",
          "subtitle": "全台首個專為飛行旅途打造的陪伴媒合平台。不論是孩子獨自搭機探親，還是長輩出國探望子女，我們為您媒合同班機的可靠陪伴者。",
          "postTrip": "發布陪伴需求",
          "becomeEscort": "成為陪伴者"
        },
        "stats": {
          "matches": "成功媒合",
          "escorts": "專業陪伴者",
          "satisfaction": "滿意度",
          "airports": "合作機場"
        },
        "solutions": {
          "title": "服務適用對象",
          "subtitle": "解決飛行中的照顧難題",
          "teens": {
            "title": "獨自搭機的青少年",
            "desc": "航空公司 UM 服務有限？為孩子媒合一位溫暖的陪伴者，全程照護更安心。"
          },
          "seniors": {
            "title": "出國探親的長輩",
            "desc": "語言不通、不熟悉轉機？讓經驗豐富的常飛旅客帶領您的父母順利抵達目的地。"
          },
          "families": {
            "title": "需要支援的家庭",
            "desc": "帶多個幼兒感到手忙腳亂？額外的一雙手讓旅途壓力減半。"
          }
        },
        "trust": {
          "badge": "安全與信任",
          "title1": "我們建立了一套",
          "title2": "最嚴謹的信任體系",
          "kyc": {
            "title": "KYC 完整實名驗證",
            "desc": "所有用戶需經過護照 OCR 比對與 Liveness 活體人臉檢測。"
          },
          "escrow": {
            "title": "Escrow 資金代管",
            "desc": "配對成後撥款，確保雙方權益，旅程結束確認無誤才撥款給陪伴者。"
          },
          "rating": {
            "title": "雙向評分系統",
            "desc": "詳細的過往旅程評價與星級，協助您篩選最合適的夥伴。"
          },
          "handoff": {
            "title": "即時交接打卡",
            "desc": "機場 QR Code 交接紀錄 GPS 與時間，系統即時推播狀態給委託方。"
          }
        },
        "reviews": {
          "clientName": "王小姐",
          "content": "“非常感謝陪伴者林先生。他非常細心地照顧我 75 歲的父親飛往倫敦，甚至在轉機時全程協助。”"
        },
        "cta": {
          "title": "準備好開始您的下一段安心旅程嗎？",
          "subtitle": "現在加入，建立專屬的陪伴請求，或成為他人旅途中的溫柔力量。",
          "register": "立即註冊帳號",
          "faq": "查看常見問題"
        }
      },
      "footer": {
        "tagline": "讓每一段旅程都有人陪伴，讓每一份擔心都能放下。專業的飛行陪伴媒合平台。",
        "services": {
          "title": "服務內容",
          "teen": "陪同青少年飛行",
          "senior": "長輩旅途照護",
          "family": "家庭飛行支援",
          "handoff": "跨國接機交接"
        },
        "platform": {
          "title": "平台規範",
          "terms": "服務條款",
          "privacy": "隱私權政策",
          "kyc": "KYC 認證流程",
          "refunds": "退款政策"
        },
        "contact": {
          "title": "聯絡我們",
          "desc": "有任何問題或建議？歡迎通過電子郵件與我們聯繫。",
          "hours": "客服時段",
          "hoursVal": "週一至週五 09:00 - 18:00"
        },
        "rights": "飛行陪伴平台. All rights reserved."
      },
      "auth": {
        "title": "加入 FlyCompanion",
        "subtitle": "啟程安心之旅",
        "login": "登入",
        "register": "註冊",
        "email": "電子郵件",
        "password": "密碼",
        "name": "真實姓名",
        "namePlaceholder": "林曉平",
        "google": "Google 登入",
        "facebook": "Facebook 登入",
        "forgotPassword": "忘記密碼？",
        "welcomeBack": "歡迎回來，",
        "startJourney": "啟程安心之旅",
        "loginTitle": "歡迎回來，",
        "registerTitle": "加入 FlyCompanion，",
        "desc": "不論是作為委託方，還是想成為陪伴者，您都可以在這裡找到最值得信賴的飛行夥伴。",
        "kycTitle": "100% 實名認證",
        "kycDesc": "我們採用最先進的護照 OCR 與活體驗證技術，確保平台上的每一位夥伴都是真實且可信賴的。",
        "loginDesc": "請使用您的帳號資訊登入平台",
        "registerDesc": "只需幾分鐘，即可開啟您的陪伴旅程",
        "loginAction": "登入帳號",
        "registerAction": "註冊帳號",
        "socialLabel": "或使用社交帳號",
        "terms1": "註冊即代表您同意我們的",
        "terms2": "與",
        "termsLink": "服務條款",
        "privacyLink": "隱私權政策",
        "dataProtection": "所有個人資料均受到系統最高等級加密保護。"
      },
      "trips": {
        "findTitle": "尋找需要陪伴的旅程",
        "createTitle": "發布陪伴請求",
        "origin": "啟程地",
        "destination": "目的地",
        "date": "航程日期",
        "dateRange": "彈性區間",
        "fixedDate": "固定日期",
        "flightNum": "班機號碼",
        "search": "搜尋",
        "budget": "預算範圍",
        "requirements": "特殊需求",
        "publish": "發布陪伴請求",
        "foundCount": "找到 {{count}} 個行程",
        "noResults": "目前沒有符合條件的陪伴請求",
        "apply": "我想接案",
        "placeholderAirport": "如 TPE, LAX",
        "labels": {
          "sideBySide": "坐鄰座",
          "assistMeal": "協助用餐",
          "assistToilet": "協助如廁",
          "assistImmigration": "協助通關",
          "handoff": "目的地交接"
        },
        "create": {
          "who": "誰需要陪伴？",
          "whoDesc": "請選擇或建立新的被照護者資料，以便陪伴者了解情況。",
          "addNew": "建立新對象",
          "editCaretaker": "編輯對象資料",
          "caretakerName": "姓名",
          "relationship": "關係",
          "birthDate": "出生日期",
          "relationshipPlaceholder": "例如：兒子、父親、配偶...",
          "flightDesc": "輸入航班資訊，我們將優先為您匹配同班機的陪伴者。",
          "reqDesc": "這些需求將作為陪伴者評估是否能勝任的標準。",
          "budgetDesc": "陪伴費用通常與航程長短及任務困難度有關。",
          "specifyBudget": "指定預算區間",
          "openBudget": "開放報價",
          "confirmDesc": "您的需求將被展示在平台，通過 KYC 驗證的陪伴者可以對您的旅程發起申請。",
          "memo": "補充說明 (Notes)",
          "memoPlaceholder": "請描述具體照護需求、特殊情況或叮嚀..."
        },
        "searchLabels": {
          "careObject": "陪伴對象",
          "sort": {
            "label": "排序",
            "newest": "最新發布",
            "price": "預算優先"
          }
        }
      },
      "dashboard": {
        "settings": "帳號設定",
        "editTrip": "編輯行程需求",
        "postTrip": "發布新旅程",
        "stats": {
          "completed": "已完成服務",
          "points": "會員積分"
        },
        "tabs": {
          "upcoming": "即將到來",
          "past": "歷史紀錄",
          "requests": "我的請求"
        },
        "profile": {
          "title": "帳號設定",
          "phone": "手機號碼 (聯絡資訊)",
          "verifyPhone": "驗證號碼",
          "phoneRecall": "* 為了確保交易安全，變更手機號碼需重新進行 OTP 簡訊驗證。"
        },
        "empty": "尚未發布任何陪伴請求",
        "emptyUpcoming": "目前沒有即將到來的旅程",
        "status": {
          "open": "招募中",
          "escrow": "Escrow 代管中"
        },
        "labels": {
          "careObject": "陪伴對象",
          "ratings": "評分",
          "agreedFee": "約定費用",
          "handoffCode": "機場交接碼",
          "deposit": "已付訂金 (20%)",
          "balance": "尾款於目的地支付",
          "contact": "聯繫陪伴者",
          "safety": "安全與合規",
          "phoneVerify": "手機號碼驗證",
          "completed": "已完成",
          "kycVerify": "KYC 實名認證",
          "kycPass": "護照與人臉比對已通過",
          "creditCard": "信用卡綁定",
          "cardDesc": "建議綁定以加速支付流程",
          "bindNow": "立即綁定",
          "needHelp": "需要協助？",
          "helpDesc": "如果您在旅程中遇到任何問題，或需要更改媒合資訊，請隨時聯繫線上客服。",
          "contactSupport": "聯繫 24/7 線上客服",
          "handoffTitle": "交接驗證碼",
          "handoffScan": "請讓陪伴者掃描此碼",
          "handoffDesc": "交接時，陪伴者會掃描此 QR Code 確認接管被照護者，系統會自動紀錄當下的地理位置與時間。",
          "gotIt": "我知道了"
        }
      }
    }
  },
  en: {
    translation: {
      "common": {
        "cancel": "Cancel",
        "save": "Save Changes",
        "loading": "Loading...",
        "processing": "Processing...",
        "submit": "Submit",
        "back": "Back",
        "next": "Next",
        "confirm": "Confirm",
        "edit": "Edit",
        "delete": "Delete",
        "verified": "Verified",
        "unverified": "Unverified",
        "status": "Status"
      },
      "nav": {
        "findTrips": "Find Trips",
        "createTrip": "Post Request",
        "dashboard": "Dashboard",
        "login": "Login / Sign Up",
        "account": "My Account",
        "howItWorks": "How it Works"
      },
      "home": {
        "hero": {
          "title1": "Every flight accompanied,",
          "title2": "Every worry set aside",
          "subtitle": "The first companion matching platform dedicated to air travel. Whether it's children flying alone or seniors visiting family, we find you reliable companions on the same flight.",
          "postTrip": "Post Request",
          "becomeEscort": "Become an Escort"
        },
        "stats": {
          "matches": "Matches",
          "escorts": "Escorts",
          "satisfaction": "Satisfaction",
          "airports": "Airports"
        },
        "solutions": {
          "title": "Who We Serve",
          "subtitle": "Solving travel care challenges",
          "teens": {
            "title": "Solo Teens",
            "desc": "Limited airline UM service? Match your child with a warm companion for extra peace of mind."
          },
          "seniors": {
            "title": "Traveling Seniors",
            "desc": "Language barriers or transit anxiety? Let experienced travelers guide your parents safely."
          },
          "families": {
            "title": "Busy Families",
            "desc": "Hands full with young children? An extra pair of hands cuts travel stress in half."
          }
        },
        "trust": {
          "badge": "Safety & Trust",
          "title1": "We've built a",
          "title2": "Rigorous Trust System",
          "kyc": {
            "title": "Full KYC Verification",
            "desc": "All users undergo passport OCR and liveness detection."
          },
          "escrow": {
            "title": "Escrow Payments",
            "desc": "Secure payments released only after successful journey completion."
          },
          "rating": {
            "title": "Two-way Ratings",
            "desc": "Detailed history and ratings to help you find the perfect partner."
          },
          "handoff": {
            "title": "Real-time Check-ins",
            "desc": "Airport QR handoffs with GPS and timestamps pushed to you instantly."
          }
        },
        "reviews": {
          "clientName": "Ms. Wang",
          "content": "\"Thanks to Mr. Lin for caring for my 75-year-old mother. He was incredibly patient and helpful during her trip to London.\""
        },
        "cta": {
          "title": "Ready for a worry-free journey?",
          "subtitle": "Join now to create a request or become a source of comfort for others.",
          "register": "Sign Up Now",
          "faq": "View FAQ"
        }
      },
      "footer": {
        "tagline": "Making every journey accompanied, letting every worry go. Professional flight escort matchmaking platform.",
        "services": {
          "title": "Services",
          "teen": "Teen Escort",
          "senior": "Senior Care",
          "family": "Family Support",
          "handoff": "International Handoff"
        },
        "platform": {
          "title": "Platform",
          "terms": "Terms of Service",
          "privacy": "Privacy Policy",
          "kyc": "KYC Process",
          "refunds": "Refund Policy"
        },
        "contact": {
          "title": "Contact Us",
          "desc": "Questions or suggestions? Contact us via email.",
          "hours": "Service Hours",
          "hoursVal": "Mon-Fri 09:00 - 18:00"
        },
        "rights": "All rights reserved."
      },
      "auth": {
        "title": "Join FlyCompanion",
        "subtitle": "Safe skies for your loved ones",
        "login": "Login",
        "register": "Sign Up",
        "email": "Email",
        "password": "Password",
        "name": "Full Name",
        "namePlaceholder": "e.g. John Doe",
        "google": "Sign in with Google",
        "facebook": "Sign in with Facebook",
        "forgotPassword": "Forgot Password?",
        "welcomeBack": "Welcome back,",
        "startJourney": "Start your safe journey",
        "loginTitle": "Welcome back,",
        "registerTitle": "Join FlyCompanion,",
        "desc": "Whether you are a requester or a companion, you can find the most trusted partners here.",
        "kycTitle": "100% Identity Verification",
        "kycDesc": "We use advanced passport OCR and liveness detection to ensure every partner on the platform is real and trustworthy.",
        "loginDesc": "Please enter your details to login",
        "registerDesc": "Join in minutes to start your journey",
        "loginAction": "Login",
        "registerAction": "Sign Up",
        "socialLabel": "Or continue with",
        "terms1": "By signing up, you agree to our",
        "terms2": "and",
        "termsLink": "Terms of Service",
        "privacyLink": "Privacy Policy",
        "dataProtection": "All personal data is protected with high-level encryption."
      },
      "trips": {
        "findTitle": "Find Companion Opportunities",
        "createTitle": "Post Companion Request",
        "origin": "Origin",
        "destination": "Destination",
        "date": "Flight Date",
        "dateRange": "Flexible Range",
        "fixedDate": "Fixed Date",
        "flightNum": "Flight Number",
        "search": "Search",
        "budget": "Budget Range",
        "requirements": "Special Requirements",
        "publish": "Post Request",
        "foundCount": "Found {{count}} trips",
        "noResults": "No matching requests found",
        "apply": "I'm interested",
        "placeholderAirport": "e.g., TPE, LAX",
        "labels": {
          "sideBySide": "Side-by-side",
          "assistMeal": "Meal Assist",
          "assistToilet": "Toilet Assist",
          "assistImmigration": "Immigration Assist",
          "handoff": "Handoff at Dest"
        },
        "create": {
          "who": "Who needs accompaniment?",
          "whoDesc": "Please select or create a profile for the person who needs care.",
          "addNew": "Add New Profile",
          "editCaretaker": "Edit Profile",
          "caretakerName": "Name",
          "relationship": "Relationship",
          "relationshipPlaceholder": "e.g. Son, Father, Spouse...",
          "birthDate": "Birth Date",
          "flightDesc": "Enter flight info so we can match you with travelers on the same flight.",
          "reqDesc": "These requirements help companions assess if they are a good fit.",
          "budgetDesc": "Fees vary based on flight duration and complexity of the task.",
          "specifyBudget": "Specify Budget",
          "openBudget": "Open for Offers",
          "confirmDesc": "Your request will be visible to KYC-verified companions who can apply to accompany the journey.",
          "memo": "Notes",
          "memoPlaceholder": "Describe specific care needs or instructions..."
        },
        "searchLabels": {
          "careObject": "Care Subject",
          "sort": {
            "label": "Sort",
            "newest": "Newest",
            "price": "Budget"
          }
        }
      },
      "dashboard": {
        "settings": "Settings",
        "editTrip": "Edit Request",
        "postTrip": "Post New Trip",
        "stats": {
          "completed": "Services Done",
          "points": "Points"
        },
        "tabs": {
          "upcoming": "Upcoming",
          "past": "Past",
          "requests": "My Requests"
        },
        "profile": {
          "title": "Account Settings",
          "phone": "Phone Number",
          "verifyPhone": "Verify",
          "phoneRecall": "* For security, changing your phone number requires OTP verification."
        },
        "empty": "No companion requests posted yet",
        "emptyUpcoming": "No upcoming journeys",
        "status": {
          "open": "Open",
          "escrow": "In Escrow"
        },
        "labels": {
          "careObject": "Care Subject",
          "ratings": "Ratings",
          "agreedFee": "Agreed Fee",
          "handoffCode": "Handoff Code",
          "deposit": "Deposit Paid (20%)",
          "balance": "Balance at Dest",
          "contact": "Contact Companion",
          "safety": "Safety & Compliance",
          "phoneVerify": "Phone Verification",
          "completed": "Completed",
          "kycVerify": "Identity Verification",
          "kycPass": "Passport & Face Check Passed",
          "creditCard": "Credit Card",
          "cardDesc": "Add a card for faster payments",
          "bindNow": "Bind Now",
          "needHelp": "Need Help?",
          "helpDesc": "Contact support anytime if you have questions.",
          "contactSupport": "Contact 24/7 Support",
          "handoffTitle": "Handoff Code",
          "handoffScan": "Let escort scan this",
          "handoffDesc": "Scan this to confirm handoff. Location and time will be recorded.",
          "gotIt": "Got it"
        }
      }
    }
  },
  ja: {
    translation: {
      "common": {
        "cancel": "キャンセル",
        "save": "変更を保存",
        "loading": "読み込み中...",
        "processing": "処理中...",
        "submit": "送信",
        "back": "戻る",
        "next": "次へ",
        "confirm": "確認",
        "edit": "編集",
        "delete": "削除",
        "verified": "本人確認済",
        "unverified": "未確認",
        "status": "ステータス"
      },
      "nav": {
        "findTrips": "旅を探す",
        "createTrip": "リクエスト投稿",
        "dashboard": "ダッシュボード",
        "login": "ログイン / 登録",
        "account": "マイアカウント",
        "howItWorks": "サービスの流れ"
      },
      "home": {
        "hero": {
          "title1": "すべての旅に付き添いを、",
          "title2": "すべての不安を安心に",
          "subtitle": "空の旅に特化した日本初の付き添いマッチングプラットフォーム。お子様の一人旅やご高齢者の海外渡航に、同じ便に搭乗する信頼できる付き添い人をマッチングします。",
          "postTrip": "リクエストを投稿",
          "becomeEscort": "付き添い人になる"
        },
        "stats": {
          "matches": "マッチング成功",
          "escorts": "付き添い人",
          "satisfaction": "満足度",
          "airports": "提携空港"
        },
        "solutions": {
          "title": "このような方に",
          "subtitle": "空の旅の課題を解決",
          "teens": {
            "title": "一人で搭乗するお子様",
            "desc": "航空会社のUMサービスだけでは不安？温かく見守る付き添い人で、より安心な旅を。"
          },
          "seniors": {
            "title": "海外のご家族を訪ねる高齢者",
            "desc": "言葉の壁や乗り継ぎが心配？経験豊富な旅行者が目的地までしっかりサポートします。"
          },
          "families": {
            "title": "サポートが必要なご家族",
            "desc": "小さなお子様連れで大変？もう一人の手があれば、旅のストレスは半分になります。"
          }
        },
        "trust": {
          "badge": "安全と信頼",
          "title1": "厳格な",
          "title2": "信頼システム",
          "kyc": {
            "title": "完全な本人確認",
            "desc": "パスポートOCRと生体認証による厳格な身元確認を実施しています。"
          },
          "escrow": {
            "title": "エスクロー決済",
            "desc": "旅の完了後に支払われる仕組みで、双方の安心と権利を守ります。"
          },
          "rating": {
            "title": "相互評価システム",
            "desc": "過去の評価や実績を確認し、最適なパートナーを選べます。"
          },
          "handoff": {
            "title": "リアルタイム報告",
            "desc": "空港での引き渡しをQRコードとGPSで記録。状態を即座に通知します。"
          }
        },
        "reviews": {
          "clientName": "王様",
          "content": "「付き添いの方に感謝しています。75歳の母をロンドンまで丁寧にサポートしてくれました。乗り継ぎも安心でした。」"
        },
        "cta": {
          "title": "安心な空の旅を始めませんか？",
          "subtitle": "今すぐ登録して、リクエストを作成するか、誰かの旅の支えになりましょう。",
          "register": "今すぐ登録",
          "faq": "よくある質問"
        }
      },
      "footer": {
        "tagline": "すべての旅に付き添いを。安心して大切な人を送り出せる飛行機付き添いマッチングプラットフォーム。",
        "services": {
          "title": "サービス",
          "teen": "ユース付き添い",
          "senior": "シニアケア",
          "family": "ファミリーサポート",
          "handoff": "国際空港での引き渡し"
        },
        "platform": {
          "title": "プラットフォーム規約",
          "terms": "利用規約",
          "privacy": "プライバシーポリシー",
          "kyc": "本人確認プロセス",
          "refunds": "返金ポリシー"
        },
        "contact": {
          "title": "お問い合わせ",
          "desc": "ご質問やご提案がありますか？メールでお問い合わせください。",
          "hours": "カスタマーサポート時間",
          "hoursVal": "月-金 09:00 - 18:00"
        },
        "rights": "All rights reserved."
      },
      "auth": {
        "title": "フライコンパニオンに参加",
        "subtitle": "安心の旅を始めましょう",
        "login": "ログイン",
        "register": "新規登録",
        "email": "メールアドレス",
        "password": "パスワード",
        "name": "氏名",
        "namePlaceholder": "例：山田 太郎",
        "google": "Googleでログイン",
        "facebook": "Facebookでログイン",
        "forgotPassword": "パスワードを忘れた場合",
        "welcomeBack": "おかえりなさい、",
        "startJourney": "安心の旅を始めましょう",
        "loginTitle": "おかえりなさい、",
        "registerTitle": "フライコンパニオンに参加、",
        "desc": "依頼者としても、付き添い人としても、ここで最も信頼できるパートナーを見つけることができます。",
        "kycTitle": "100% 本人確認",
        "kycDesc": "最新のパスポートOCRと生体認証技術を使用して、プラットフォーム上のすべてのパートナーが本物で信頼できることを保証します。",
        "loginDesc": "アカウント情報を使用してログインしてください",
        "registerDesc": "数分で登録完了、安心の旅を始めましょう",
        "loginAction": "ログイン",
        "registerAction": "新規登録",
        "socialLabel": "またはSNSアカウントで登録",
        "terms1": "登録することで、当社の",
        "terms2": "と",
        "termsLink": "利用規約",
        "privacyLink": "プライバシーポリシー",
        "dataProtection": "すべての個人データは最高レベルの暗号化で保護されています。"
      },
      "trips": {
        "findTitle": "付き添いが必要な旅を探す",
        "createTitle": "リクエストを投稿する",
        "origin": "出発地",
        "destination": "目的地",
        "date": "フライト日",
        "dateRange": "柔軟な期間",
        "fixedDate": "固定日",
        "flightNum": "便名",
        "search": "検索",
        "budget": "予算範囲",
        "requirements": "特別リクエスト",
        "publish": "リクエストを公開",
        "foundCount": "{{count}} 件の旅が見つかりました",
        "noResults": "該当するリクエストが見つかりません",
        "apply": "この案件に応募する",
        "placeholderAirport": "例：TPE, LAX",
        "labels": {
          "sideBySide": "隣席",
          "assistMeal": "食事補助",
          "assistToilet": "トイレ補助",
          "assistImmigration": "入国審査補助",
          "handoff": "目的地での引き渡し"
        },
        "create": {
          "who": "付き添いが必要なのはどなたですか？",
          "whoDesc": "付き添い人が状況を把握できるよう、対象者のプロフィールを選択または作成してください。",
          "addNew": "新規作成",
          "editCaretaker": "プロフィールを編集",
          "caretakerName": "名前",
          "relationship": "関係",
          "relationshipPlaceholder": "例：息子、父、配偶者...",
          "birthDate": "生年月日",
          "flightDesc": "フライト情報を入力してください。同じ便の付き添い人を優先的にマッチングします。",
          "reqDesc": "これらの要件は、付き添い人が対応可能かどうかを判断する基準となります。",
          "budgetDesc": "付き添い費用は、フライト時間やサポート内容によって異なります。",
          "specifyBudget": "予算を指定する",
          "openBudget": "見積もりを募集",
          "confirmDesc": "リクエストはプラットフォームに公開されます。本人確認済みの付き添い人が応募できるようになります。",
          "memo": "補足説明 (Notes)",
          "memoPlaceholder": "具体的なケアのニーズや注意事項を記入してください..."
        },
        "searchLabels": {
          "careObject": "付き添い対象",
          "sort": {
            "label": "並べ替え",
            "newest": "新着順",
            "price": "予算順"
          }
        }
      },
      "dashboard": {
        "settings": "アカウント設定",
        "editTrip": "リクエストを編集",
        "postTrip": "新しい旅を投稿",
        "stats": {
          "completed": "完了したサービス",
          "points": "ポイント"
        },
        "tabs": {
          "upcoming": "予定",
          "past": "履歴",
          "requests": "自分のリクエスト"
        },
        "profile": {
          "title": "アカウント設定",
          "phone": "電話番号（連絡先）",
          "verifyPhone": "認証",
          "phoneRecall": "* セキュリティのため、電話番号の変更にはOTP認証が必要です。"
        },
        "empty": "リクエストはまだありません",
        "emptyUpcoming": "予定されている旅はありません",
        "status": {
          "open": "募集中",
          "escrow": "エスクロー中"
        },
        "labels": {
          "careObject": "付き添い対象",
          "ratings": "評価",
          "agreedFee": "合意費用",
          "handoffCode": "引き渡しコード",
          "deposit": "預金支払済 (20%)",
          "balance": "目的地での残高支払",
          "contact": "付き添い人に連絡",
          "safety": "安全とコンプライアンス",
          "phoneVerify": "電話番号認証",
          "completed": "完了",
          "kycVerify": "本人確認",
          "kycPass": "パスポートと顔認証に合格",
          "creditCard": "クレジットカード",
          "cardDesc": "支払いをスムーズにするためのカード登録",
          "bindNow": "登録する",
          "needHelp": "お困りですか？",
          "helpDesc": "質問がある場合は、いつでもサポートにお問い合わせください。",
          "contactSupport": "24時間365日サポートに連絡",
          "handoffTitle": "引き渡しコード",
          "handoffScan": "付き添い人にスキャンさせてください",
          "handoffDesc": "引き渡しを確認するためにスキャンします。場所と時間が記録されます。",
          "gotIt": "わかりました"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
