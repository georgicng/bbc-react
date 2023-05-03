import Block from '../components/Block'
import { BLOCKS } from '../config'

const Home = ({ blocks = BLOCKS }) => {
  return (
    <section className="page-wrapper innerpage-section-padding">
      <div id="home-page">
        <div className="container-fluid">
          <div className="row">
            {blocks.map((block) => (
              <Block key={block.key} {...block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
