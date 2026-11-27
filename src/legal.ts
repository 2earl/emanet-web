import { CONTACT, type Company } from './company';

/**
 * Emanet's legal pages, written for Turkish law (KVKK 6698, its Aydınlatma and Başvuru
 * communiqués and the Board's cookie guide; TBK; TTK). Turkish is the text that counts.
 *
 * DRAFT for a lawyer's review, like the service agreement (emanet-core src/contract.ts). Change
 * UPDATED with every change; the old text should be kept in the repository's history.
 */

export const UPDATED = '28 Kasım 2026';

export interface Block {
  /** A heading, then paragraphs and lists. */
  h: string;
  p?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
}

export interface LegalPage {
  path: string;
  title: string;
  lede: string;
  blocks: Block[];
}

const who = (c: Company) =>
  `${c.name}, ${c.address} (vergi dairesi ve numarası: ${c.taxOffice} ${c.vkn}; MERSİS: ${c.mersis}; KEP: ${c.kep}; e-posta: ${c.email})`;

export function privacy(c: Company): LegalPage {
  return {
    path: '/gizlilik',
    title: 'Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni',
    lede: 'Emanet’i kullanan kurumların çalışanları, saha görevlileri, aranan araçlarla ilgili kişiler ve bize yazan herkes için: hangi verileri, neden, hangi hukuki sebeple işlediğimiz, kimlere aktardığımız ve haklarınızı nasıl kullanacağınız. 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun (“KVKK”) 10. maddesi ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca hazırlanmıştır.',
    blocks: [
      {
        h: '1. Veri sorumlusu',
        p: [
          `Emanet hizmetini (emanet.dev, kurumsal.emanet.dev, saha.emanet.dev) ${who(c)} işletir ve bu metinde “Emanet” veya “biz” olarak anılır.`,
          `Bu metinle ilgili her konuda ${CONTACT} adresine yazabilirsiniz.`,
        ],
      },
      {
        h: '2. Hangi rolde işliyoruz',
        p: [
          'Emanet, alacaklı kurumların (bankalar, varlık yönetim şirketleri ve benzerleri) hakkında yakalama şerhi bulunan araçlarını bulmalarına yardım eder. Bu araçlar ve icra dosyalarıyla ilgili bilgileri bize alacaklı kurum verir; bu bilgiler bakımından veri sorumlusu ilgili alacaklı kurumdur, Emanet onun adına ve talimatıyla işleyen “veri işleyen”dir. Bu verilere ilişkin talepleriniz için öncelikle ilgili alacaklıya başvurmanız gerekir; bize ulaşan talepleri gecikmeden ona iletiriz.',
          'Kurum kullanıcılarının, saha görevlilerinin, kurum yetkililerinin ve bize yazanların verileri bakımından veri sorumlusu Emanet’tir.',
        ],
      },
      {
        h: '3. İşlenen veriler, amaçlar ve hukuki sebepler',
        table: {
          head: ['Kimler', 'Hangi veriler', 'Neden', 'Hukuki sebep (KVKK m. 5/2)'],
          rows: [
            [
              'Kurum kullanıcıları (alacaklı kurumların çalışanları)',
              'Ad soyad, e-posta, kurum ve rol, 2earl hesabının tekil kimliği; yaptığı işlemlerin kayıtları (ne zaman, ne yaptı), IP adresi',
              'Hizmeti sunmak, yetkiyi kontrol etmek, güvenlik ve denetim izi, destek',
              '(c) sözleşmenin kurulması ve ifası; (ç) hukuki yükümlülük; (f) meşru menfaat (güvenlik ve kötüye kullanımın önlenmesi)',
            ],
            [
              'Kurum yetkilileri (katılım sırasında)',
              'İmza yetkilisinin ad soyadı ve unvanı, iletişim bilgileri, imza sirküleri ve vergi levhası gibi belgeler, sözleşme onayının zamanı ve IP adresi',
              'Kurumun Emanet’e katılması, sözleşmenin kurulması ve ispatı',
              '(c) sözleşme; (e) bir hakkın tesisi, kullanılması veya korunması',
            ],
            [
              'Saha görevlileri',
              'Ad soyad, kimlik belgesi doğrulaması, telefon, kendi adına IBAN, vergi bilgileri; araç bildiriminde çekilen fotoğraflar ve o andaki konum; görev, ödeme ve işlem kayıtları',
              'Başvuruyu değerlendirmek, kimliği doğrulamak, görev vermek, bildirimi ve teslimi belgelemek, ödeme yapmak, vergi ve muhasebe yükümlülükleri, kuralların uygulanması',
              '(c) sözleşme; (ç) hukuki yükümlülük (vergi, muhasebe); (e) hakkın korunması; (f) meşru menfaat',
            ],
            [
              'Aranan araçlarla ilgili kişiler (araç sahipleri, borçlular)',
              'Plaka, şasi numarası, marka ve model; icra dairesi ve dosya numarası; aracın aranabileceği adresler (ev, iş, son görüldüğü yer); teslim belgeleri',
              'Alacaklının talimatıyla aracın bulunması, kolluğa bildirilmesi ve yediemine teslimin belgelenmesi',
              'Veri sorumlusu alacaklı kurumdur; Emanet onun talimatıyla işler (KVKK m. 12)',
            ],
            [
              'Bize yazanlar ve başvuranlar',
              'E-posta adresi, yazdıklarınız ve ekleri',
              'Sorunuzu yanıtlamak, talebinizi sonuçlandırmak',
              '(c) sözleşme; (ç) hukuki yükümlülük (KVKK başvuruları); (f) meşru menfaat',
            ],
          ],
        },
        p: [
          'Saha görevlilerine borçlunun adı, borcu veya alacaklının iç bilgileri hiçbir zaman gösterilmez; adresler yalnızca aracı üstlendikleri süre boyunca ve yalnızca o araç için gösterilir, her görüntüleme kayıt altına alınır. Saha görevlisinin konumu sürekli izlenmez; yalnızca bir aracı gördüğünü bildirdiği anda alınır.',
          'Özel nitelikli kişisel veri (sağlık, din, ceza mahkûmiyeti vb.) işlemeyiz ve kurumlardan bu tür verileri Emanet’e girmemelerini isteriz.',
        ],
      },
      {
        h: '4. Toplama yöntemi',
        p: [
          'Veriler; Emanet’in web uygulamaları ve uygulama programlama arayüzü (API) üzerinden doldurulan formlar ve yüklenen dosyalarla, saha görevlilerinin cihaz kamerası ve konum izniyle, e-posta yazışmalarıyla ve sistemin tuttuğu işlem kayıtlarıyla, elektronik ortamda ve kısmen otomatik yollarla toplanır.',
          'Giriş, 2earl’ün kimlik hizmeti login.2earl.com üzerinden yapılır. Emanet bu hizmetten yalnızca hesabınızın tekil kimliğini, varsa iki adımlı doğrulama bilgisini ve kurum üyeliklerinizi alır. login.2earl.com’un kendi aydınlatma metni geçerlidir.',
        ],
      },
      {
        h: '5. Aktarım',
        list: [
          'Alacaklı kurumlara: kendi dosyalarının durumu ve teslim belgeleri. Saha görevlisinin kimliği alacaklıya verilmez.',
          'Yetkili kamu kurum ve kuruluşlarına (kolluk, icra daireleri, mahkemeler, vergi idaresi): kanunun öngördüğü hallerde ve talep üzerine.',
          'Bankalara ve elektronik fatura hizmet sağlayıcılarına: ödemelerin ve faturaların yapılması için gerekli olduğu kadar.',
          'Hizmet sağlayıcılarımıza (veri işleyen sıfatıyla): Cloudflare, Inc. ve bağlı şirketleri (barındırma, veri tabanı, dosya depolama, e-posta gönderimi). Veriler Avrupa Birliği yetki alanındaki veri merkezlerinde saklanır.',
          '2earl’ün kimlik hizmetine (login.2earl.com): girişin yapılabilmesi için.',
        ],
        p: [
          'Yurt dışındaki alıcılara aktarım, KVKK’nın 9. maddesi ve Kişisel Verilerin Yurt Dışına Aktarılmasına İlişkin Usul ve Esaslar Hakkında Yönetmelik uyarınca, Kurulca ilan edilen standart sözleşmelerle ve bu sözleşmelerin Kuruma bildirilmesiyle yapılır.',
        ],
      },
      {
        h: '6. Saklama süresi',
        p: [
          'Verileri, işlendikleri amaç için gerekli olduğu süre ve ilgili mevzuattaki saklama süreleri boyunca (örneğin ticari defter ve belgeler için Türk Ticaret Kanunu m. 82 uyarınca 10 yıl, vergi kayıtları için Vergi Usul Kanunu m. 253 uyarınca 5 yıl) ve olası uyuşmazlıklar için zamanaşımı süreleri boyunca saklarız. Süre dolunca veriler Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında Yönetmelik uyarınca silinir, yok edilir veya anonim hale getirilir.',
          'Aranan araçlarla ilgili veriler, alacaklının talimatı ve aramızdaki sözleşme çerçevesinde; dosya kapandıktan sonra erişimi kısıtlanmış olarak saklanır ve sözleşme sona erdiğinde alacaklıya iade edilir veya silinir.',
        ],
      },
      {
        h: '7. Haklarınız (KVKK m. 11)',
        list: [
          'Kişisel verilerinizin işlenip işlenmediğini öğrenmek ve işlenmişse buna ilişkin bilgi talep etmek,',
          'İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenmek,',
          'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilmek,',
          'Eksik veya yanlış işlenmişse düzeltilmesini istemek,',
          'KVKK m. 7’deki şartlar çerçevesinde silinmesini veya yok edilmesini istemek,',
          'Düzeltme, silme ve yok etme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini istemek,',
          'Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etmek,',
          'Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etmek.',
        ],
      },
      {
        h: '8. Başvuru',
        p: [
          `Haklarınıza ilişkin talebinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca; yazılı olarak ${c.address} adresine, kayıtlı elektronik posta (KEP) ile ${c.kep} adresine, güvenli elektronik imza veya mobil imza ile ya da sistemimizde kayıtlı e-posta adresinizden ${CONTACT} adresine iletebilirsiniz. Nasıl başvuracağınız ve başvuruda bulunması gerekenler: <a href="/kvkk-basvuru">KVKK başvurusu</a>.`,
          'Başvurunuzu en kısa sürede ve en geç otuz gün içinde ücretsiz sonuçlandırırız; işlemin ayrıca bir maliyet gerektirmesi hâlinde Kurulca belirlenen tarifedeki ücret alınabilir. Başvurunuz reddedilir, yanıtı yetersiz bulunur veya süresinde yanıtlanmazsa Kişisel Verileri Koruma Kuruluna şikâyette bulunabilirsiniz (KVKK m. 14).',
        ],
      },
      {
        h: '9. Çerezler',
        p: [
          'emanet.dev çerez kullanmaz ve ziyaretçileri izlemez. Emanet uygulamaları yalnızca oturum ve dil tercihi için zorunlu çerezler kullanır: <a href="/cerezler">Çerez politikası</a>.',
        ],
      },
    ],
  };
}

export function terms(c: Company): LegalPage {
  return {
    path: '/kullanim-sartlari',
    title: 'Emanet Kullanım Şartları',
    lede: 'Emanet Kurumsal’ı ve Emanet Saha’yı kullanan herkes için geçerli kurallar. Bir kurum için Emanet’i kullanıyorsanız kurumunuzun imzaladığı Emanet Hizmet Sözleşmesi, bu şartlarla çeliştiği ölçüde önce gelir.',
    blocks: [
      {
        h: '1. Taraflar ve kapsam',
        p: [
          `Emanet hizmetini ${who(c)} (“Emanet”) sunar. Bu şartlar; emanet.dev, kurumsal.emanet.dev ve saha.emanet.dev adreslerindeki hizmetlerin kullanımını düzenler. Bir hesapla giriş yapmanız, bu şartları kabul ettiğiniz anlamına gelir.`,
        ],
      },
      {
        h: '2. Hizmetin niteliği',
        p: [
          'Emanet; alacaklıların, hakkında yetkili icra dairesince yakalama şerhi konulmuş araçlarını kaydettiği, doğrulanmış saha görevlilerinin bu araçları kamuya açık alanlarda arayıp gördüklerinde kolluğa bildirdiği ve teslim sürecinin belgelendiği bir platformdur.',
          'Emanet ve saha görevlileri hiçbir surette icra işlemi yapmaz, araca el koymaz, aracı çekmez, taşımaz veya yerinden oynatmaz, borçluyla borç hakkında görüşmez ve tahsilat yapmaz. Aracın yakalanması ve yediemine teslimi yalnızca kolluk tarafından, 2004 sayılı İcra ve İflas Kanunu ve ilgili mevzuat çerçevesinde yapılır. Emanet bir kamu kurumu değildir.',
        ],
      },
      {
        h: '3. Hesap ve giriş',
        p: [
          'Giriş, 2earl hesabınızla login.2earl.com üzerinden yapılır. Hesabınızın ve iki adımlı doğrulama araçlarınızın güvenliğinden siz sorumlusunuz; yetkisiz kullanım şüphesini hemen bize bildirin. Kurum hesaplarında kimin hangi yetkiye sahip olduğuna kurumun yöneticileri karar verir.',
        ],
      },
      {
        h: '4. Kurumlar',
        list: [
          'Yalnızca hakkında geçerli yakalama şerhi bulunan araçları ve doğru bilgileri kaydedersiniz.',
          'Şerh kalktığında, borç ödendiğinde veya takip durduğunda dosyayı en geç 24 saat içinde geri çekersiniz.',
          'Borçlunun borç tutarını, sağlık bilgilerini veya özel nitelikli kişisel verilerini Emanet’e girmezsiniz.',
          'API anahtarlarınızı ve webhook sırlarınızı yalnızca güvenli sistemlerde saklarsınız.',
          'Ücretler, faturalama ve sorumluluk, Emanet Hizmet Sözleşmesi ile belirlenir.',
        ],
      },
      {
        h: '5. Saha görevlileri',
        p: [
          'Saha görevlileri Emanet’in işçisi veya temsilcisi değildir; bağımsız olarak, kendi seçtikleri zamanda ve yerde çalışır. Başvuru, kimlik ve banka hesabı doğrulamasından sonra kabul edilir. Ajan kuralları (saha.emanet.dev/terms) bu şartların parçasıdır.',
        ],
        list: [
          'Kişi değil araç aranır. Kimse takip edilmez, gözetlenmez, rahatsız edilmez (TCK m. 123/A ısrarlı takip; m. 134 özel hayatın gizliliği).',
          'Araca dokunulmaz, araç çekilmez veya taşınmaz. Araç görüldüğünde 112 aranır ve kolluğun talimatlarına uyulur.',
          'Borçluyla borç konuşulmaz, kimseden para veya eşya alınmaz; gerginlik halinde ortam terk edilir.',
          'Fotoğraflar yalnızca araç, plaka ve belgelerden ibarettir; uygulamada gösterilen adresler gizlidir, not edilmez ve paylaşılmaz (TCK m. 135-136).',
          'Ödeme, teslimin Emanet tarafından teyidinden ve alacaklının ödemesinden sonra yalnızca görevlinin kendi adına olan IBAN’a yapılır. Mevzuat gereği yapılması gereken vergi kesintileri yapılır; görevlinin kendi vergi yükümlülükleri kendisine aittir.',
          'Kurallara aykırılıkta hesap derhal askıya alınır; suç teşkil eden durumlar yetkili makamlara bildirilir.',
        ],
      },
      {
        h: '6. Yasak kullanımlar',
        list: [
          'Hizmeti hukuka aykırı amaçla, başkası adına veya başkasının hesabıyla kullanmak,',
          'Gösterilen bilgileri hizmetin amacı dışında kaydetmek, çoğaltmak veya üçüncü kişilerle paylaşmak,',
          'Sistemin güvenliğini sınamak, aşmak veya otomatik araçlarla aşırı yük oluşturmak (güvenlik açığı bildirimleri iletisim@emanet.dev adresine yapılır).',
        ],
      },
      {
        h: '7. Fikri mülkiyet',
        p: [
          'Emanet’in yazılımı, tasarımı ve içerikleri üzerindeki haklar Emanet’e ve 2earl’e aittir. Size, hizmeti bu şartlar çerçevesinde kullanmanız için kişisel, devredilemez ve münhasır olmayan bir kullanım hakkı tanınır. Kurumların girdiği veriler kurumlara aittir.',
        ],
      },
      {
        h: '8. Sorumluluk',
        p: [
          'Emanet bir aracın bulunacağını veya belirli bir sürede teslim edileceğini taahhüt etmez. Kanunen sınırlandırılamayan haller (kast ve ağır ihmal dahil) saklı kalmak üzere, dolaylı zararlardan ve kâr kaybından sorumlu değiliz. Hizmeti makul özenle ve kesintisiz sunmaya çalışırız; planlı bakımları önceden bildiririz.',
        ],
      },
      {
        h: '9. Değişiklikler ve sona erme',
        p: [
          'Bu şartları değiştirebiliriz; esaslı değişiklikleri yürürlükten en az 30 gün önce e-posta veya uygulama içinde bildiririz. Hesabınızı dilediğiniz zaman kapatabilirsiniz; kanuni saklama süreleri saklıdır.',
        ],
      },
      {
        h: '10. Uygulanacak hukuk ve yetki',
        p: [
          'Bu şartlar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir; tüketici sıfatını taşıyanların kanundan doğan hakları saklıdır.',
          `İletişim: ${CONTACT}.`,
        ],
      },
    ],
  };
}

export function cookies(): LegalPage {
  const row = (site: string, name: string, why: string, how: string) => [site, name, why, how];
  return {
    path: '/cerezler',
    title: 'Çerez Politikası',
    lede: 'emanet.dev hiç çerez kullanmaz. Emanet uygulamaları yalnızca çalışabilmeleri için zorunlu çerezleri kullanır; reklam, analiz veya izleme çerezi kullanılmaz ve üçüncü taraf çerezi yoktur.',
    blocks: [
      {
        h: 'Kullanılan çerezler',
        table: {
          head: ['Nerede', 'Çerez', 'Ne için', 'Süresi'],
          rows: [
            row('emanet.dev', 'Yok', '—', '—'),
            row(
              'kurumsal, merkez ve saha.emanet.dev',
              '__Host-session',
              'Giriş yaptığınızı hatırlamak (oturum)',
              '8 saat hareketsizlik, en fazla 7 gün',
            ),
            row(
              'kurumsal, merkez ve saha.emanet.dev',
              '__Host-signin',
              'Giriş işleminin güvenliği (login.2earl.com’a gidip dönerken)',
              '10 dakika',
            ),
            row(
              'kurumsal, merkez ve saha.emanet.dev',
              '__Host-lang',
              'Seçtiğiniz dili (Türkçe veya İngilizce) hatırlamak; yalnızca dil seçtiğinizde',
              '1 yıl',
            ),
          ],
        },
      },
      {
        h: 'Hukuki dayanak',
        p: [
          'Bu çerezler, talep ettiğiniz hizmetin sunulabilmesi için kesinlikle gereklidir; Kişisel Verileri Koruma Kurumunun Çerez Uygulamaları Hakkında Rehberi uyarınca bunlar için açık rıza alınmaz. Hukuki sebep, sözleşmenin kurulması ve ifası ile meşru menfaattir (KVKK m. 5/2-c, f). Çerez değerleri yalnızca imzalı ve tahmin edilemez tanımlayıcılardır; içinde adınız veya e-postanız bulunmaz.',
          'Tarayıcınızdan çerezleri silebilir veya engelleyebilirsiniz; bu durumda Emanet uygulamalarına giriş yapamazsınız. Giriş sayfası login.2earl.com’un kendi çerezleri, o hizmetin politikasına tabidir.',
          'Ayrıntılar için: <a href="/gizlilik">Aydınlatma metni</a>.',
        ],
      },
    ],
  };
}

export function application(c: Company): LegalPage {
  return {
    path: '/kvkk-basvuru',
    title: 'KVKK Başvurusu',
    lede: 'Kişisel verilerinizle ilgili haklarınızı (KVKK m. 11) kullanmak için nasıl başvuracağınız. Başvurular ücretsizdir ve en geç 30 gün içinde yanıtlanır.',
    blocks: [
      {
        h: 'Nereye',
        list: [
          `Yazılı olarak, ıslak imzalı dilekçeyle: ${c.address}`,
          `Kayıtlı elektronik posta (KEP) ile: ${c.kep}`,
          'Güvenli elektronik imza veya mobil imza ile imzalanmış olarak, e-postayla',
          `Emanet’te kayıtlı e-posta adresinizden: ${CONTACT}`,
        ],
      },
      {
        h: 'Başvuruda bulunması gerekenler',
        p: [
          'Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ’in 5. maddesi uyarınca başvurunuzda şunlar bulunmalıdır:',
        ],
        list: [
          'Ad, soyad ve başvuru yazılı ise imza,',
          'Türkiye Cumhuriyeti vatandaşları için T.C. kimlik numarası; yabancılar için uyruk, pasaport numarası veya varsa kimlik numarası,',
          'Tebligata esas yerleşim yeri veya iş yeri adresi,',
          'Varsa bildirime esas elektronik posta adresi, telefon ve faks numarası,',
          'Talep konusu: hangi hakkınızı kullandığınız ve ne istediğiniz; varsa ilgili belgeler.',
        ],
      },
      {
        h: 'Kimliğinizi doğrulama',
        p: [
          'Bilgileri yalnızca sahibine verebilmek için kimliğinizi doğrulamamız gerekir. Emanet hesabınız varsa hesabınızdaki e-posta adresinden yazmanız yeterlidir; yoksa ek bilgi isteyebiliriz.',
          'Aranan bir araçla ilgili verileriniz için veri sorumlusu, aracı Emanet’e kaydeden alacaklı kurumdur. Başvurunuzu ona yapmanız gerekir; bize gelirse gecikmeden ona iletir ve sizi bilgilendiririz.',
        ],
      },
      {
        h: 'Başvuru formu',
        p: [
          'Doldurup imzalayabileceğiniz veya e-postanıza ekleyebileceğiniz bir metin: <a href="/kvkk-basvuru-formu.txt" download>Başvuru formunu indir</a>.',
        ],
      },
    ],
  };
}

export const APPLICATION_FORM = `KİŞİSEL VERİLERE İLİŞKİN BAŞVURU FORMU
(6698 sayılı KVKK m. 11 ve 13; Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ m. 5)

Veri sorumlusu: Emanet (emanet.dev) — ${CONTACT}

1. Başvuru sahibi
Ad soyad:
T.C. kimlik numarası (yabancılar için uyruk ve pasaport numarası):
Tebligata esas adres:
E-posta:
Telefon:

2. Emanet ile ilişkiniz
[ ] Kurum kullanıcısı   [ ] Saha görevlisi   [ ] Kurum yetkilisi
[ ] Aranan bir araçla ilgili kişi   [ ] Diğer: ..........

3. Talebiniz
[ ] Verilerimin işlenip işlenmediğini öğrenmek ve bilgi almak
[ ] İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenmek
[ ] Aktarıldığı üçüncü kişileri öğrenmek
[ ] Düzeltme
[ ] Silme veya yok etme
[ ] Düzeltme veya silmenin aktarılan kişilere bildirilmesi
[ ] Otomatik analizle ortaya çıkan sonuca itiraz
[ ] Zararın giderilmesi

Açıklama:

4. Yanıtın iletilmesi
[ ] Adresime posta ile   [ ] E-posta ile   [ ] KEP ile

Tarih:
İmza:
`;

export function imprint(c: Company, known: boolean): LegalPage {
  return {
    path: '/kunye',
    title: 'Künye',
    lede: 'Emanet’i işleten şirket ve iletişim bilgileri.',
    blocks: [
      {
        h: 'Şirket',
        table: {
          head: ['', ''],
          rows: [
            ['Ticaret unvanı', c.name],
            ['Merkez adresi', c.address],
            ['Vergi dairesi ve numarası', `${c.taxOffice} ${c.vkn}`],
            ['MERSİS numarası', c.mersis],
            ['KEP adresi', c.kep],
            ['E-posta', c.email],
          ],
        },
        p: known ? [] : ['Şirket bilgileri yakında burada yayımlanacak.'],
      },
      {
        h: 'Emanet ve 2earl',
        p: [
          'Emanet, 2earl’ün bir hizmetidir. Giriş, 2earl’ün kimlik hizmeti login.2earl.com üzerinden yapılır. Emanet bir kamu kurumu değildir; icra işlemi yapmaz.',
          `Her konuda: ${CONTACT}.`,
        ],
      },
    ],
  };
}
