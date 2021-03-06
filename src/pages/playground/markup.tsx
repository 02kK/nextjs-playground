import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";

import LinkButton from "../../component/LinkButton";
import StyledPGContainer from "../../component/StyledPGContainer";

// Property does not exist on type 'JSX.IntrinsicElements'のコンパイルエラーとなった際の妥協策
declare global {
  namespace JSX {
    interface IntrinsicElements {
      rb: any;
    }
  }
}

const dateToday = new Date();

// ファイル名はルーティング時のパス名、関数名はコンポーネント名になる
// Caution!: ファイル名を大文字で始めると（ブラウザ側でも）大文字でパス指定する必要がある
// Caution!: 関数名を小文字で始めると関数コンポーネントとして認識されなくなる（当然Hooksも使えない）
const Markup = () => {
  // 再レンダリング検知
  // console.log("rerender");

  // JSXの場合にはscript要素を使うのではなく副作用はuseEffectで記述
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `this is useEffect!but...?`;
    setTimeout(() => {
      document.title = "Create Next App";
    }, 5000);
  }, []);

  const [isModalOpen, useIsModalOpen] = useState(false);
  const useReverseModalState = () => {
    useIsModalOpen(!isModalOpen);
  };

  // document.getElementById("modal").showModal()

  // Warning: X did not match.Server: y Client: z が出るため一旦コメントアウト
  // const [dateNow, setDateNow] = useState(new Date());
  // const refreshNowDate = () => setDateNow(() => new Date());

  return (
    <StyledPGContainer>
      <>
        <section>
          <details>
            <summary>Prefectures of Japan(Widget)</summary>
            <dl>
              <dt>Japan</dt>
              <dd>Tokyo</dd>
              <dd>Chiba</dd>
              <dd>Kanagawa</dd>
              <dd>Saitama</dd>
            </dl>
          </details>
          <figure>
            <Image
              src="/img/shared/my_icon.jpeg"
              alt="my_icon"
              height="300"
              width="300"
            />
            <figcaption>アイコン画像</figcaption>
          </figure>
        </section>
        <a href="#">
          <p>
            a要素はトランスペアレントなので親が内包できるコンテンツを内包できる
          </p>
        </a>
        <hr />
        <p>
          {/* ルビのつけかた */}
          <p>1重ルビ</p>
          <ruby>
            <rb>局地</rb>
            <rt>きょくち</rt>
            <rb>気象</rb>
            <rt>きしょう</rt>
            <rb>予報</rb>
            <rt>よほう</rt>
          </ruby>
          <br />
          {/* Chromeなどでの二重なルビの付け方 */}
          <p>2重ルビ</p>
          <ruby>
            <ruby>
              <rb>米</rb>
              <rt>べい</rt>
            </ruby>
            <rt>こめ</rt>
          </ruby>
        </p>
        {/* Warning: X did not match.Server: y Client: z が出る */}
        {/* TODO: 下記記事参照して理解して必ず解決すること */}
        {/* https://qiita.com/aiji42/items/748bf3ef3c7ca65535db */}
        {/* <time>
        本日の日付は
        {`${dateToday.getFullYear()}/${dateToday.getMonth()}/${dateToday.getDay()}`}
      </time>
      <br />
      <time>只今の時刻は{`${dateNow}`}</time>
      <button onClick={refreshNowDate}>refresh time!</button> */}
        <hr />
        <code className="lang-javascript">
          console.log(<mark>window.href</mark>)
        </code>
        <p>
          古い日本のお札には日本銀行が
          <bdo dir="rtl">
            <mark>日本銀行</mark>
          </bdo>
          と表記されていた
        </p>
        <hr />
        <dialog id="modal" open={isModalOpen}>
          <div>
            <h2>Continue...?</h2>
            <button onClick={useReverseModalState}>close modal?</button>
            <span> / </span>
            <Link href="/sitemap">No</Link>
            <div className="non_scroll"></div>
          </div>
        </dialog>
        <button onClick={useReverseModalState}>open modal?</button>
        <hr />
        <form action="post">
          <input
            autoCapitalize="characters"
            inputMode="decimal"
            autoFocus
          ></input>
        </form>
        <hr />
        <SDownloadLink href="/pdf/sample.pdf" download>
          PDFサンプルのDownloadリンクはこちら
        </SDownloadLink>
        <hr />
        <noscript>
          We can&apos;t use JavaScript on your blowser.
          <br />
          Please activate JavaScript.
        </noscript>
        <LinkButton href="/sitemap" buttonText="Return Sitemap" />
        <p>&copy; &lt;Markup Sample&gt;</p>
      </>
    </StyledPGContainer>
  );
};

const SDownloadLink = styled.a`
  &::before {
    content: url(/img/shared/pdf_icon.png);
    vertical-align: middle;
  }
`;

export default Markup;
