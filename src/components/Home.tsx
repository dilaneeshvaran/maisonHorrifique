import React from 'react';
import '../styles/home.css';
import '../styles/switch.css';

interface Props {
  isLightOn: boolean;

}

const Home: React.FC<Props> = ({ isLightOn }) => {
  return (
    <div className={`home-container ${isLightOn ? 'light-on' : 'light-off'}`}>
      <header>
        <h1>Bienvenue à La Maison Horrifique</h1>
      </header>
      <main>
        <section>
          <article>
            <p>Nous organisons des sessions d'escape game dans un environnement horrifique, où vous devrez résoudre des énigmes et relever des défis pour vous échapper.</p>
          </article>
          <article>
            <p>Que vous soyez amateurs d'aventure, passionnés d'horreur, en groupe d'amis ou une entreprise en quête d'activités de team building originales, nous avons ce qu'il vous faut.</p>
          </article>
          <br></br>
          <article>
            <h2>Nos Points Forts</h2>
            <ul>
              <li>Des décors réalistes qui... Nous vous laissons les voir</li>
              <li>Des énigmes complexes qui mettront vos neurones à rude épreuve.</li>
              <li>Une immersion totale dans un univers terrifiant et captivant.</li>
            </ul>
          </article>
        </section>
      </main>

    </div>
  );
}

export default Home;
