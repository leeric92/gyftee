import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import { Link } from 'react-router';
import { saveConcert } from '../Actions/friend';
import PORT from '../../config/port';
import Thumbnail from './thumbnail';
import ThumbnailConcert from './thumbnailConcert';
import Book from './book';
import Slider from'react-slick';
import sliderSettings from '../../util/sliderSettings';

var ConcertList = React.createClass({

  mixins: [ Navigation ],

  navToGiftDetail: function(id) {
    this.transitionTo(`/gifts/${id}`);
  },

  componentDidMount: function() {
    var artist = [];
    if (this.props.concerts) {
      this.props.concerts.forEach(function(concert) {
        var artistName = concert.artists[0].name;
        artist.push(artistName);
      });
      this.getArtistImage(artist)
    }
  },

  render: function() {
    var concerts = [];
    var artist = [];
    var mainArtistArr;
    if (this.props.concerts) {
      this.props.concerts.forEach(function(concert) {
        var artistName = concert[0].artists[0].name;
        artist.push(artistName);
      });
      this.getArtistImage(artist, function(artistArr) {
        if (!this.props.friend.concert && Array.isArray(artistArr)) {
          this.props.dispatch(saveConcert(artistArr))
        } else {
          console.log(artistArr);
        }
      }.bind(this))
    }

    if (this.props.concerts) {
      var flattened = this.props.concerts.reduce(function(a, b) {
            return a.concat(b);
          }, []);

          for(var key in flattened){
            concerts.push(
              <div>
                <ThumbnailConcert concert={flattened[key]} artist={this.props.friend.concert} key={flattened[key].id} />
              </div>
            );
          }
    }

    return (
      <div className="books-list">
        <div className="row light-teal category">
          <div className="category-header">Concerts</div>
        </div>
          <div className="slider-container">
            <Slider {...sliderSettings} className="books-list">
              {concerts}
            </Slider>
          </div>
      </div>

      );
  },

  getArtistImage: function(artist, callback) {
    $.ajax({
      context: this,
      url: "http://localhost:" + PORT.PORT + "/api/gifts/getartistimage",
      method: 'POST',
      data: {artist : artist}, // need to pass in the access token
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, err) {
        console.error("http://localhost:" + PORT.PORT + "/api/friends", status, err.toString());
      }
    });
  },
});

var mapStateToProps = function(state) {
  return {
    profile: state.user.profile,
    friends: state.user.friends,
    friend: state.friend
  }
};

export default connect(mapStateToProps)(ConcertList);
