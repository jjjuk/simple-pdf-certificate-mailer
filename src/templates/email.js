const html = ({ name, productId, product }) => {
  const {
    webinarUrl,
    webinarPassword,
    googleDriveUrl,
    yandexDiscUrl,
  } = require(`./${productId}`)
  return `
<div>
  <div
    style="
      color: #000000;
      font-family: Verdana, Arial, Helvetica, sans-serif;
      font-size: 11px;
      font-style: normal;
      font-variant-ligatures: normal;
      font-variant-caps: normal;
      font-weight: 400;
      letter-spacing: normal;
      orphans: 2;
      text-align: start;
      text-indent: 0px;
      text-transform: none;
      white-space: normal;
      widows: 2;
      word-spacing: 0px;
      -webkit-text-stroke-width: 0px;
      text-decoration-style: initial;
      text-decoration-color: initial;
    "
  >
    <div
      style="
        color: #000000;
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-style: normal;
        font-variant-ligatures: normal;
        font-variant-caps: normal;
        font-weight: 400;
        letter-spacing: normal;
        orphans: 2;
        text-align: start;
        text-indent: 0px;
        text-transform: none;
        white-space: normal;
        widows: 2;
        word-spacing: 0px;
        -webkit-text-stroke-width: 0px;
        text-decoration-style: initial;
        text-decoration-color: initial;
      "
    >
      <p>
        <span style="font-size: 17px; font-family: Arial, Helvetica, sans-serif"
          >Здравствуйте, ${name} !</span
        >
      </p>
    </div>
    <div
      style="
        color: #000000;
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-style: normal;
        font-variant-ligatures: normal;
        font-variant-caps: normal;
        font-weight: 400;
        letter-spacing: normal;
        orphans: 2;
        text-align: start;
        text-indent: 0px;
        text-transform: none;
        white-space: normal;
        widows: 2;
        word-spacing: 0px;
        -webkit-text-stroke-width: 0px;
        text-decoration-style: initial;
        text-decoration-color: initial;
      "
    >
      <p>
        <span style="font-size: 17px"
          ><span style="font-family: Arial, Helvetica, sans-serif"
            >Вы получили данное сообщение, так как приобрели методический
            материал. <br />Заказ: <strong>${product}</strong><br />На сайте
            <a href="https://d-seminar.ru/"><strong>d-seminar.ru</strong></a>
            Спасибо за вашу поддержку!&nbsp;<br /></span></span
        ><img
          src="https://sun9-37.userapi.com/or1oKENh06PtYhMsvPcEg-Ujv-0kgABVvCx0NA/C9trX1_oKMo.jpg"
          alt=""
          width="424"
          height="98"
        /><br /><br />
      </p>
      <p>Материалы:</p>
    </div>
    <ul>
      <li>
        <span style="font-size: 16px"
          >Сертификат участника прикреплен к письму. <br />
          <br />
        </span>
      </li>
      <li>
        <span style="font-size: 16px"
          >Видео с вебинара (только для Вас)
          <a href="${webinarUrl}"
            ><strong>- ссылка.</strong></a
          ><br /></span
        ><span style="font-size: 16px"
          >Пароль для входа:&nbsp;${webinarPassword}<br /><br
        /></span>
      </li>
    </ul>
    <ul>
      <li>
        <strong
          >Весь методический материал
          <a
            href="${googleDriveUrl}"
            >- ссылка.</a
          ><br />Запасная ссылка на материалы (повтор)<a
            href="${yandexDiscUrl}"
          >
            - ссылка.</a
          ><br /><br
        /></strong>
      </li>
      <li>
        У меня только просьба не выкладывать материалы в свободный доступ
        интернета. <br />Так как у нас есть определенные договоренности с
        автором о материалах. <br />Спасибо за понимание.<br /><br />
      </li>
    </ul>
    <div>
      &nbsp;Схема как скачивать (у вас &nbsp;будут другие файлы)<br /><img
        src="https://sun9-52.userapi.com/c840328/v840328904/72edf/bX5p63c98tQ.jpg"
        alt=""
        width="430"
        height="269"
      />
    </div>
    <div
      style="
        color: #000000;
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-style: normal;
        font-variant-ligatures: normal;
        font-variant-caps: normal;
        font-weight: 400;
        letter-spacing: normal;
        orphans: 2;
        text-align: start;
        text-indent: 0px;
        text-transform: none;
        white-space: normal;
        widows: 2;
        word-spacing: 0px;
        -webkit-text-stroke-width: 0px;
        text-decoration-style: initial;
        text-decoration-color: initial;
      "
    >
      &nbsp;<br /><br />
    </div>
    <div
      style="
        color: #000000;
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-style: normal;
        font-variant-ligatures: normal;
        font-variant-caps: normal;
        font-weight: 400;
        letter-spacing: normal;
        orphans: 2;
        text-align: start;
        text-indent: 0px;
        text-transform: none;
        white-space: normal;
        widows: 2;
        word-spacing: 0px;
        -webkit-text-stroke-width: 0px;
        text-decoration-style: initial;
        text-decoration-color: initial;
      "
    >
      &nbsp;
    </div>
    <div
      style="
        color: #000000;
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-style: normal;
        font-variant-ligatures: normal;
        font-variant-caps: normal;
        font-weight: 400;
        letter-spacing: normal;
        orphans: 2;
        text-align: start;
        text-indent: 0px;
        text-transform: none;
        white-space: normal;
        widows: 2;
        word-spacing: 0px;
        -webkit-text-stroke-width: 0px;
        text-decoration-style: initial;
        text-decoration-color: initial;
      "
    >
      <h2><strong>Рекомендуемые прошлые материалы (приобрести):</strong></h2>
      <p><strong>&nbsp;</strong></p>
      <table style="width: 1025px" border="4" cellspacing="4" cellpadding="8">
        <tfoot>
          <tr>
            <td style="width: 205px">
              <a href="https://d-seminar.ru/video"
                ><strong>Все курсы!</strong></a
              ><br /><a href="https://d-seminar.ru/video"
                ><img
                  src="https://sun9-30.userapi.com/r9JTh_vVBJOYJh4KoJK4GMnUg6UMpziG3oq3mQ/weT67Plpt3k.jpg"
                  alt=""
                  width="130"
                  height="154"
              /></a>
            </td>
            <td style="width: 197px">
              <p>
                <strong
                  ><a href="https://d-seminar.ru/video/emelyanov-master-klass"
                    >Емельянов В.В.</a
                  ></strong
                ><br /><a
                  href="https://d-seminar.ru/video/emelyanov-master-klass"
                  >"Развивающие голосовые игры для дошкольников!&nbsp;</a
                ><br /><br /><a
                  href="https://d-seminar.ru/video/emelyanov-master-klass"
                  ><img
                    src="https://sun9-73.userapi.com/6y8vN3327E3nYhO-u2of4vWDIKhxCgJNR0CM-w/V_M0DC7LgVw.jpg"
                    alt=""
                    width="180"
                    height="123" /><br
                /></a>
              </p>
            </td>
            <td style="width: 180px">
              <p>
                <a
                  href="https://d-seminar.ru/video/vebinar-doshkolnogo-obrazovaniya-igry"
                  >Вебинар по <strong>играм!</strong> Авторская методика<strong
                    >.</strong
                  ></a
                ><br /><img
                  src="https://sun1-25.userapi.com/ZI2hjUgwqDn0KWh34aXUTDOaVrFTarg3bJBpXw/lPN5XN4PXEY.jpg"
                  alt=""
                  width="167"
                  height="110"
                />
              </p>
            </td>
            <td style="width: 168px">
              <p>
                <a href="https://d-seminar.ru/video/poznanie-muzyka-malysh"
                  >Ранний возраст. </a
                ><br /><a
                  href="https://d-seminar.ru/video/poznanie-muzyka-malysh"
                  >Познание, музыка, малыш</a
                ><br /><a
                  href="https://d-seminar.ru/video/poznanie-muzyka-malysh"
                  ><img
                    src="https://sun9-27.userapi.com/_grRQ3a4Wl67qMuZ_5mnwlPjyX8Ar8rPNT5yKQ/JurykCSZvPc.jpg"
                    alt=""
                    width="155"
                    height="130" /></a
                ><br /><br />
              </p>
              <p>&nbsp;</p>
            </td>
            <td style="width: 153px">
              <p>
                <a
                  href="https://d-seminar.ru/video/muzykalnoe-razvitie-doshkolnikov"
                  >Музыкальное развитие через игру</a
                >
              </p>
              <p>
                <img
                  src="https://sun9-73.userapi.com/oygVkJ9iRpxwJvYGS53HJSsgZ36YyqE5Rdposw/moNkgTn683A.jpg"
                  alt=""
                  width="182"
                  height="103"
                />
              </p>
            </td>
          </tr>
          <tr>
            <td style="width: 205px">
              <p>
                <a href="https://d-seminar.ru/video/kartushina-skachat"
                  >Вебинар&nbsp;<strong>Картушиной М.Ю.</strong></a
                ><br /><a href="https://d-seminar.ru/video/kartushina-skachat"
                  >"Логоритмика!"</a
                ><br /><br /><a
                  href="https://d-seminar.ru/video/kartushina-skachat"
                  ><img
                    src="http://login.sendpulse.com/files/emailservice/userfiles/b995190d36e4a32cb8f8de99ef9d57f66645558/m9h2jud_1P8.jpg"
                    alt=""
                    width="167"
                    height="110"
                    data-cke-saved-src="http://login.sendpulse.com/files/emailservice/userfiles/b995190d36e4a32cb8f8de99ef9d57f66645558/m9h2jud_1P8.jpg"
                /></a>
              </p>
            </td>
            <td style="width: 197px">
              <p>
                <a href="https://d-seminar.ru/video/ladushki-programma"
                  >Программа<strong>"Ладушки"&nbsp;</strong>Обучение детей игре
                  на ложках</a
                ><a
                  href="https://d-seminar.ru/video/logomuzik-kak-razgovorit-molchuna-2-3-4-5-goda"
                  rel="noopener noreferrer"
                  ><br /></a
                ><br /><img
                  src="https://sun9-33.userapi.com/impf/c858524/v858524985/efe0d/2l5xydoOySE.jpg?size=243x162&amp;quality=96&amp;proxy=1&amp;sign=983add7c34ab9012e95f2517d5fbbfae"
                  alt=""
                  width="180"
                  height="120"
                />
              </p>
            </td>
            <td style="width: 180px">
              <p>
                <a
                  href="https://d-seminar.ru/video/krmusician-kazhdyy-rebyonok-muzykant"
                  ><strong>Рокитянская Т.А.</strong> Каждый ребенок музыкант</a
                ><br /><a
                  href="https://d-seminar.ru/video/krmusician-kazhdyy-rebyonok-muzykant"
                  ><img
                    src="https://sun9-49.userapi.com/pkE9BDQtNhdpix0F8SfXQPle7fI43TUDXarGPw/85w2fh3yp14.jpg"
                    alt=""
                    width="170"
                    height="114"
                /></a>
              </p>
            </td>
            <td style="width: 168px">
              <a href="https://d-seminar.ru/video/pedagog_online"
                >"Готовимся с детьми к Новогоднему празднику"[Зимний
                материал]</a
              ><br /><br /><img
                src="https://sun9-44.userapi.com/impf/_aySiHN787XN-eW-rskpnMg6yR9IXn_xhSh9_A/afR5-2rRUr4.jpg?size=334x212&amp;quality=96&amp;proxy=1&amp;sign=b578507086e5ae9a93659c6fdf4e3325"
                alt=""
                width="193"
                height="122"
              />
            </td>
            <td style="width: 153px">
              <p>
                <a
                  href="https://d-seminar.ru/video/vebinar-dlya-pedagogov-s-sertifikatom"
                  >Новогодние песенки, танцы, игры. Зимний материал</a
                ><a
                  href="https://d-seminar.ru/video/logomuzik-kak-razgovorit-molchuna-2-3-4-5-goda"
                  rel="noopener noreferrer"
                  ><br /><br /><br /><img
                    src="https://sun9-64.userapi.com/voYd66t9s2T39CTcUNUTnmsajOxAau8bPhPxHg/a3RWZtRmq54.jpg"
                    alt=""
                    width="173"
                    height="98"
                /></a>
              </p>
            </td>
          </tr>
        </tfoot>
      </table>
      <p>
        Всем кто приобрел материал, он придет в течении 12 часов, если "нет"
        пишите на почту:&nbsp;<a
          href="mailto:margo@d-seminar.ru"
          rel="noopener noreferrer"
          data-cke-saved-href="mailto:margo@d-seminar.ru"
          >margo@d-seminar.ru<br /></a
        >Спасибо за вашу поддержку!<strong>&nbsp;</strong>
      </p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </div>
    <div
      style="
        color: #000000;
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-style: normal;
        font-variant-ligatures: normal;
        font-variant-caps: normal;
        font-weight: 400;
        letter-spacing: normal;
        orphans: 2;
        text-align: start;
        text-indent: 0px;
        text-transform: none;
        white-space: normal;
        widows: 2;
        word-spacing: 0px;
        -webkit-text-stroke-width: 0px;
        text-decoration-style: initial;
        text-decoration-color: initial;
      "
    >
      &nbsp;
    </div>
    <div
      style="
        color: #000000;
        font-family: Verdana, Arial, Helvetica, sans-serif;
        font-size: 11px;
        font-style: normal;
        font-variant-ligatures: normal;
        font-variant-caps: normal;
        font-weight: 400;
        letter-spacing: normal;
        orphans: 2;
        text-align: start;
        text-indent: 0px;
        text-transform: none;
        white-space: normal;
        widows: 2;
        word-spacing: 0px;
        -webkit-text-stroke-width: 0px;
        text-decoration-style: initial;
        text-decoration-color: initial;
      "
    >
      <p>
        <em>Маргарита Алексеевна (организатор вебинара)</em> <br /><em>
          <a href="mailto:9164593129@mail.ru">9164593129@mail.ru</a> - &nbsp;
          &nbsp; </em
        ><em>&nbsp;рабочая</em> <br /><em>margo@</em><em>d-seminar.ru</em>
        <em>-&nbsp;</em
        ><em
          >рабочая
          <em
            >(сайт:
            <a href="http://d-seminar.ru/"><strong>d-seminar.ru</strong></a> )
            <br />Наш
            <a
              href="https://www.youtube.com/channel/UC3wUc1ZUnWfetFAEqH8evlA?sub_confirmation=1"
              rel="noopener noreferrer"
              >Youtube</a
            >
            канал&nbsp;
          </em></em
        >
        <br /><em
          >Я в
          <a href="http://vk.com/id242414067">Вконтакте</a> (присоединяйтесь в
          друзья)&nbsp;<br /><a
            href="https://www.instagram.com/margarita_d_seminar/"
            >Инстаграм&nbsp;</a
          ></em
        >
        <br />
        <a href="http://vk.com/id242414067">
          <img
            src="https://pp.userapi.com/c847019/v847019393/14a23a/pCn2GTCzGfo.jpg"
            alt=""
            width="103"
            height="138"
          />
        </a>
      </p>
    </div>
  </div>
</div>
<div>
  <div>
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div
                                style="
                                  color: #000000;
                                  font-family: Verdana, Arial, Helvetica,
                                    sans-serif;
                                  font-size: 11px;
                                  font-style: normal;
                                  font-variant-ligatures: normal;
                                  font-variant-caps: normal;
                                  font-weight: 400;
                                  letter-spacing: normal;
                                  orphans: 2;
                                  text-align: start;
                                  text-indent: 0px;
                                  text-transform: none;
                                  white-space: normal;
                                  widows: 2;
                                  word-spacing: 0px;
                                  -webkit-text-stroke-width: 0px;
                                  text-decoration-style: initial;
                                  text-decoration-color: initial;
                                "
                              >
                                &nbsp;
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

`
}
module.exports = html
