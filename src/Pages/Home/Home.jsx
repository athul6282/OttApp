import './Home.css'
import { topRated, action, comedy, scifi, war, adventure, crime, drama, documentary, family, fantasy, history, music, mystery,tvMovie, western, romance } from '../../urls'
import Herobanner from '../../components/HeroBanner/Herobanner'
import Videocard from '../../components/VideoCard/Videocard'
import Category from '../Category/Category'
import { searchMovieUrl } from "../../constants/constants";

const Home = ({ showSearch, searchQuery }) => {
  return (
    <div className='home-container'>
      {showSearch && searchQuery ? (
        <Category url={searchMovieUrl(searchQuery)} title={`Results for "${searchQuery}"`} />
      ) : (
        <>
          <Herobanner />
          <div id="movies-section">
            <Videocard url={topRated} title='Top Rated'  category="topRated" />
            <Videocard url={action} title='Action'  category="action"/>
            <Videocard url={comedy} title='Comedy'  category="comedy"/>
            <Videocard url={scifi} title='Sci-Fi'  category="sci-fi"/>
            <Videocard url={war} title='War'  category="war"/>
            <Videocard url={adventure} title='Adventure'  category="adventure"/>
            <Videocard url={crime} title='Crime'  category="crime"/>
            <Videocard url={drama} title='Drama'  category="drama"/>
            <Videocard url={documentary} title='Documentary'  category="documentary"/>
            <Videocard url={family} title='Family'  category="family"/>
            <Videocard url={fantasy} title='Fantasy'  category="fantasy"/>
            <Videocard url={history} title='History'  category="history"/>
            <Videocard url={music} title='Music'  category="music"/>
            <Videocard url={mystery} title='Mystery'  category="mystery"/>
            <Videocard url={romance} title='Romance'  category="romance"/>
            <Videocard url={tvMovie} title='TV Movie'  category="tvMovie"/>
            <Videocard url={western} title='Western'  category="western"/>
          </div>
        </>

      )}
    </div>
  )
}

export default Home