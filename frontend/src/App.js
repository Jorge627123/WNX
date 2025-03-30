import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Skeleton,
  Fade,
  Zoom,
  Slide,
  useTheme,
  useMediaQuery,
  Snackbar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
  FormControlLabel,
  Switch,
  ButtonGroup,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import RefreshIcon from '@mui/icons-material/Refresh';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HistoryIcon from '@mui/icons-material/History';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ImageIcon from '@mui/icons-material/Image';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import HelpIcon from '@mui/icons-material/Help';
import PublicIcon from '@mui/icons-material/Public';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FilterListIcon from '@mui/icons-material/FilterList';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerIcon from '@mui/icons-material/Timer';
import SourceIcon from '@mui/icons-material/Source';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import QueueIcon from '@mui/icons-material/Queue';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PreviewIcon from '@mui/icons-material/Preview';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import PollIcon from '@mui/icons-material/Poll';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const API_URL = 'http://localhost:8000';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B',  // Playful coral red
      light: '#FF8E8E',
      dark: '#E85555'
    },
    secondary: {
      main: '#4ECDC4',  // Fresh mint green
      light: '#6FF7EE',
      dark: '#37B8B0'
    },
    background: {
      default: '#FFFBE9',  // Soft cream background
      paper: '#FFFFFF'
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72'
    },
    error: {
      main: '#FF7675'  // Soft red
    },
    warning: {
      main: '#FFEAA7'  // Soft yellow
    },
    success: {
      main: '#55EFC4'  // Mint success
    }
  },
  typography: {
    fontFamily: "'Quicksand', 'Roboto', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem'
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '8px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)'
          }
        },
        contained: {
          background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #E85555 30%, #FF6B6B 90%)'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          '&:hover': {
            transform: 'scale(1.05)'
          },
          transition: 'transform 0.2s ease'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.2s ease-in-out'
        }
      }
    }
  }
});

const QuickPostButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1DA1F2 30%, #2196F3 90%)',
  borderRadius: 30,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(29, 161, 242, .3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #1a90d9 30%, #1e88e5 90%)',
    transform: 'scale(1.05)',
  },
  transition: 'all 0.3s ease'
}));

const PostPreviewCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, #1DA1F2, #2196F3)',
    borderRadius: '18px',
    zIndex: -1
  }
}));

function LoadingSkeleton() {
  return (
    <Box sx={{ width: '100%' }}>
      <Skeleton variant="rectangular" height={400} />
      <Box sx={{ pt: 2 }}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  );
}

const QuickPostDialog = ({ open, onClose, post, onPost }) => {
  const [postText, setPostText] = useState(post?.text || '');
  const [schedule, setSchedule] = useState(false);
  const [scheduleTime, setScheduleTime] = useState(new Date(Date.now() + 30 * 60000)); // 30 minutes from now
  const [threadMode, setThreadMode] = useState(false);
  const [threadPosts, setThreadPosts] = useState(['']);
  const [imagePreview, setImagePreview] = useState(post?.image || null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [pollActive, setPollActive] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollDuration, setPollDuration] = useState(24); // hours
  const [emotion, setEmotion] = useState('excited');
  const [showEmotions, setShowEmotions] = useState(false);

  const handlePost = () => {
    if (threadMode) {
      onPost({ 
        type: 'thread',
        posts: threadPosts,
        schedule: schedule ? scheduleTime : null,
        image: imagePreview
      });
    } else {
      onPost({
        type: 'single',
        text: postText,
        schedule: schedule ? scheduleTime : null,
        image: imagePreview
      });
    }
    onClose();
  };

  const handleMediaUpload = (event) => {
    const files = Array.from(event.target.files);
    setMediaFiles(prev => [...prev, ...files].slice(0, 4)); // X allows up to 4 media files
  };

  const handleRemoveMedia = (index) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions(prev => [...prev, '']);
    }
  };

  const handlePollOptionChange = (index, value) => {
    setPollOptions(prev => prev.map((opt, i) => i === index ? value : opt));
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <TwitterIcon sx={{ color: '#1DA1F2' }} />
            <Typography variant="h6">Quick Post to X</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {!threadMode ? (
            <TextField
              fullWidth
              multiline
              rows={4}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's happening?"
              variant="outlined"
              InputProps={{
                sx: { 
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'background.paper',
                  }
                }
              }}
            />
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {threadPosts.map((post, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    {index + 1}
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={post}
                    onChange={(e) => {
                      const newPosts = [...threadPosts];
                      newPosts[index] = e.target.value;
                      setThreadPosts(newPosts);
                    }}
                    placeholder={`Thread post ${index + 1}`}
                    variant="outlined"
                    InputProps={{
                      sx: { bgcolor: 'background.paper' }
                    }}
                  />
                  {index > 0 && (
                    <IconButton 
                      color="error" 
                      onClick={() => setThreadPosts(posts => posts.filter((_, i) => i !== index))}
                      sx={{ mt: 1 }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => setThreadPosts(posts => [...posts, ''])}
                sx={{
                  alignSelf: 'flex-start',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'rgba(29, 161, 242, 0.1)'
                  }
                }}
              >
                Add to Thread
              </Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={threadMode}
                  onChange={(e) => {
                    setThreadMode(e.target.checked);
                    if (e.target.checked) {
                      setThreadPosts([postText || '']);
                    } else {
                      setPostText(threadPosts[0] || '');
                    }
                  }}
                />
              }
              label="Thread Mode"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={schedule}
                  onChange={(e) => setSchedule(e.target.checked)}
                />
              }
              label="Schedule Post"
            />
          </Box>

          {schedule && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Schedule for"
                value={scheduleTime}
                onChange={setScheduleTime}
                minDateTime={new Date()}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ bgcolor: 'background.paper' }}
              />
            </LocalizationProvider>
          )}

          {imagePreview && (
            <PostPreviewCard>
              <CardContent>
                <Box sx={{ position: 'relative' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Attached Image:
                  </Typography>
                  <img
                    src={imagePreview}
                    alt="Post preview"
                    style={{
                      width: '100%',
                      maxHeight: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => setImagePreview(null)}
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': {
                        bgcolor: 'background.paper',
                      }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </PostPreviewCard>
          )}

          {/* Media Upload Section */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <input
              type="file"
              multiple
              accept="image/*,video/*,gif/*"
              style={{ display: 'none' }}
              id="media-upload"
              onChange={handleMediaUpload}
            />
            <label htmlFor="media-upload">
              <Button
                component="span"
                startIcon={<UploadIcon />}
                variant="outlined"
                disabled={mediaFiles.length >= 4}
              >
                Add Media
              </Button>
            </label>
            <IconButton onClick={() => setShowEmojis(!showEmojis)}>
              <EmojiEmotionsIcon />
            </IconButton>
            <IconButton onClick={() => setPollActive(!pollActive)}>
              <PollIcon />
            </IconButton>
            <IconButton onClick={() => setShowPreview(!showPreview)}>
              <PreviewIcon />
            </IconButton>
          </Box>

          {/* Media Preview */}
          {mediaFiles.length > 0 && (
            <Grid container spacing={1}>
              {mediaFiles.map((file, index) => (
                <Grid item xs={6} key={index}>
                  <Box sx={{ position: 'relative' }}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveMedia(index)}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        bgcolor: 'background.paper'
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Poll Section */}
          {pollActive && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Create Poll
              </Typography>
              {pollOptions.map((option, index) => (
                <TextField
                  key={index}
                  fullWidth
                  size="small"
                  value={option}
                  onChange={(e) => handlePollOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  sx={{ mb: 1 }}
                  InputProps={{
                    endAdornment: index > 1 && (
                      <IconButton
                        size="small"
                        onClick={() => setPollOptions(prev => prev.filter((_, i) => i !== index))}
                      >
                        <CloseIcon />
                      </IconButton>
                    )
                  }}
                />
              ))}
              {pollOptions.length < 4 && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddPollOption}
                  size="small"
                >
                  Add Option
                </Button>
              )}
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption">Poll Duration (hours)</Typography>
                <Slider
                  value={pollDuration}
                  onChange={(e, value) => setPollDuration(value)}
                  min={1}
                  max={168} // 7 days
                  marks={[
                    { value: 24, label: '24h' },
                    { value: 72, label: '3d' },
                    { value: 168, label: '7d' }
                  ]}
                />
              </Box>
            </Box>
          )}

          {/* Thread Preview */}
          {showPreview && threadMode && (
            <Box sx={{ mt: 2, bgcolor: 'background.default', p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Thread Preview
              </Typography>
              {threadPosts.map((post, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: '50%',
                      bottom: '-16px',
                      width: 2,
                      height: 16,
                      bgcolor: 'primary.main',
                      display: index < threadPosts.length - 1 ? 'block' : 'none'
                    }
                  }}
                >
                  <Typography variant="body2">{post}</Typography>
                </Paper>
              ))}
            </Box>
          )}

          {/* Emotion Selection */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Headline Emotion
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.keys(EMOTIONAL_TONES).map((tone) => (
                <EmotionChip
                  key={tone}
                  label={tone}
                  emotion={tone}
                  onClick={() => setEmotion(tone)}
                  variant={emotion === tone ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Box>

          {/* Preview with Emotion */}
          {postText && (
            <HeadlineCard emotion={emotion}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                  {postText.split('\n')[0]}
                </Typography>
              </CardContent>
            </HeadlineCard>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: 'text.secondary',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.05)'
            }
          }}
        >
          Cancel
        </Button>
        <QuickPostButton
          onClick={handlePost}
          startIcon={<TwitterIcon />}
          disabled={threadMode ? threadPosts.some(post => !post.trim()) : !postText.trim()}
        >
          {schedule ? 'Schedule Post' : 'Post Now'}
        </QuickPostButton>
      </DialogActions>
    </Dialog>
  );
};

const ScheduledPostsDialog = ({ open, onClose, posts, onDelete, onEdit }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <ScheduleIcon color="primary" />
            <Typography variant="h6">Scheduled Posts</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {posts.length === 0 ? (
            <Typography color="text.secondary" align="center">
              No scheduled posts yet
            </Typography>
          ) : (
            posts.map((post) => (
              <PostPreviewCard key={post.id}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" color="primary">
                      Scheduled for: {new Date(post.scheduledFor).toLocaleString()}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => onEdit(post)}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => onDelete(post.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  {post.type === 'thread' ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {post.posts.map((text, index) => (
                        <Typography key={index} variant="body2">
                          {index + 1}. {text}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2">{post.text}</Typography>
                  )}
                  {post.image && (
                    <Box sx={{ mt: 1 }}>
                      <img
                        src={post.image}
                        alt="Scheduled post"
                        style={{
                          width: '100%',
                          maxHeight: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    </Box>
                  )}
                </CardContent>
              </PostPreviewCard>
            ))
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

// Add Analytics Dashboard Component
const AnalyticsDashboard = ({ open, onClose, postHistory, engagement }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [metric, setMetric] = useState('impressions');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <AnalyticsIcon color="primary" />
          <Typography>Analytics Dashboard</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          {/* Time Range Selection */}
          <Box sx={{ mb: 3 }}>
            <ButtonGroup>
              {['24h', '7d', '30d', 'all'].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'contained' : 'outlined'}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          {/* Metrics Overview */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {['impressions', 'likes', 'retweets', 'replies'].map((m) => (
              <Grid item xs={3} key={m}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: metric === m ? 'primary.light' : 'background.paper'
                  }}
                  onClick={() => setMetric(m)}
                >
                  <Typography variant="h6">
                    {engagement?.[m] || 0}
                  </Typography>
                  <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                    {m}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Post Performance */}
          <Typography variant="h6" gutterBottom>
            Post Performance
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Post</TableCell>
                  <TableCell align="right">Impressions</TableCell>
                  <TableCell align="right">Engagement Rate</TableCell>
                  <TableCell align="right">Posted</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postHistory.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.headline}</TableCell>
                    <TableCell align="right">{post.engagement?.impressions || 0}</TableCell>
                    <TableCell align="right">
                      {post.engagement ? 
                        `${((post.engagement.likes + post.engagement.retweets + post.engagement.replies) / 
                        post.engagement.impressions * 100).toFixed(2)}%` : 
                        '0%'}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const HeadlineCard = styled(Card)(({ theme, emotion }) => {
  const getEmotionColors = () => {
    switch (emotion) {
      case 'excited':
        return { main: '#FFD700', gradient: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)' };
      case 'funny':
        return { main: '#FF69B4', gradient: 'linear-gradient(45deg, #FF69B4 30%, #FF1493 90%)' };
      case 'shocking':
        return { main: '#FF4500', gradient: 'linear-gradient(45deg, #FF4500 30%, #FF6347 90%)' };
      case 'heartwarming':
        return { main: '#FF69B4', gradient: 'linear-gradient(45deg, #FF69B4 30%, #DB7093 90%)' };
      case 'mysterious':
        return { main: '#9370DB', gradient: 'linear-gradient(45deg, #9370DB 30%, #8A2BE2 90%)' };
      case 'silly':
        return { main: '#00CED1', gradient: 'linear-gradient(45deg, #00CED1 30%, #40E0D0 90%)' };
      default:
        return { main: theme.palette.primary.main, gradient: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)' };
    }
  };

  const colors = getEmotionColors();

  return {
    position: 'relative',
    overflow: 'visible',
    transition: 'all 0.3s ease-in-out',
    background: colors.gradient,
    '&:hover': {
      transform: 'scale(1.02) rotate(1deg)',
      boxShadow: `0 8px 24px rgba(${colors.main}, 0.2)`,
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      background: colors.gradient,
      borderRadius: '18px',
      zIndex: -1,
      opacity: 0.6,
      filter: 'blur(8px)',
      transition: 'all 0.3s ease-in-out'
    },
    '&:hover::before': {
      opacity: 0.8,
      filter: 'blur(12px)'
    }
  };
});

const EmotionChip = styled(Chip)(({ theme, emotion }) => {
  const getEmotionStyle = () => {
    switch (emotion) {
      case 'excited':
        return { bgcolor: '#FFD700', color: '#000' };
      case 'funny':
        return { bgcolor: '#FF69B4', color: '#fff' };
      case 'shocking':
        return { bgcolor: '#FF4500', color: '#fff' };
      case 'heartwarming':
        return { bgcolor: '#FF69B4', color: '#fff' };
      case 'mysterious':
        return { bgcolor: '#9370DB', color: '#fff' };
      case 'silly':
        return { bgcolor: '#00CED1', color: '#fff' };
      default:
        return { bgcolor: theme.palette.primary.main, color: '#fff' };
    }
  };

  return {
    ...getEmotionStyle(),
    fontWeight: 'bold',
    '&:hover': {
      transform: 'scale(1.1) rotate(3deg)'
    },
    transition: 'all 0.2s ease-in-out'
  };
});

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [engagement, setEngagement] = useState(null);
  const [selectedHeadline, setSelectedHeadline] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageTab, setImageTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [postHistory, setPostHistory] = useState([]);
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [customTweet, setCustomTweet] = useState('');
  const [copied, setCopied] = useState(false);
  const [savedStories, setSavedStories] = useState([]);
  const [categories, setCategories] = useState([
    'Weird', 'Funny', 'Bizarre', 'Unusual', 'Viral'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('Weird');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedStories, setSuggestedStories] = useState([]);
  const [botOpen, setBotOpen] = useState(false);
  const [botMessages, setBotMessages] = useState([
    {
      type: 'bot',
      content: 'Hi! I\'m your AI assistant. I can help you with:',
      suggestions: [
        'How to create engaging headlines',
        'Tips for better image selection',
        'Best practices for X posting',
        'How to track engagement'
      ]
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [botCategories, setBotCategories] = useState([
    { id: 'headlines', label: 'Headlines', icon: <TrendingUpIcon /> },
    { id: 'images', label: 'Images', icon: <ImageIcon /> },
    { id: 'engagement', label: 'Engagement', icon: <ChatIcon /> },
    { id: 'content', label: 'Content', icon: <LightbulbIcon /> }
  ]);
  const [selectedBotCategory, setSelectedBotCategory] = useState(null);
  const [botTips, setBotTips] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [regions, setRegions] = useState([
    { id: 'world', label: 'World', icon: <PublicIcon /> },
    { id: 'us', label: 'United States', icon: <PublicIcon /> },
    { id: 'uk', label: 'United Kingdom', icon: <PublicIcon /> },
    { id: 'europe', label: 'Europe', icon: <PublicIcon /> },
    { id: 'asia', label: 'Asia', icon: <PublicIcon /> },
    { id: 'africa', label: 'Africa', icon: <PublicIcon /> },
    { id: 'latin_america', label: 'Latin America', icon: <PublicIcon /> },
    { id: 'middle_east', label: 'Middle East', icon: <PublicIcon /> }
  ]);
  const [timeRanges, setTimeRanges] = useState([
    { id: '24h', label: 'Last 24 Hours', icon: <AccessTimeIcon /> },
    { id: '7d', label: 'Last 7 Days', icon: <AccessTimeIcon /> },
    { id: '30d', label: 'Last 30 Days', icon: <AccessTimeIcon /> }
  ]);
  const [selectedRegion, setSelectedRegion] = useState('world');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [minEngagement, setMinEngagement] = useState(0);
  const [excludeKeywords, setExcludeKeywords] = useState('');
  const [filterDialog, setFilterDialog] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [autoSettings, setAutoSettings] = useState({
    minViralPotential: 0.7,
    minEngagementScore: 0.6,
    minFreshnessScore: 0.8,
    preferredSources: [],
    excludedSources: [],
    keywordsBoost: [],
    autoPost: false,
    autoRetry: false,
    maxRetries: 3,
    checkInterval: 5 // minutes
  });
  const [autoCheckInterval, setAutoCheckInterval] = useState(null);
  const [sourceOptions, setSourceOptions] = useState([
    { value: 'reuters.com', label: 'Reuters' },
    { value: 'apnews.com', label: 'AP News' },
    { value: 'bbc.com', label: 'BBC' },
    { value: 'theguardian.com', label: 'The Guardian' },
    { value: 'nytimes.com', label: 'NY Times' },
    { value: 'washingtonpost.com', label: 'Washington Post' },
    { value: 'bloomberg.com', label: 'Bloomberg' },
    { value: 'cnn.com', label: 'CNN' },
    { value: 'foxnews.com', label: 'Fox News' },
    { value: 'nbcnews.com', label: 'NBC News' }
  ]);
  const [quickPostDialog, setQuickPostDialog] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [scheduledPostsDialog, setScheduledPostsDialog] = useState(false);
  const [analyticsDashboard, setAnalyticsDashboard] = useState(false);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/news`, {
        params: {
          keywords: searchQuery,
          categories: selectedCategory,
          regions: selectedRegion,
          time_range: selectedTimeRange,
          min_engagement: minEngagement,
          exclude_keywords: excludeKeywords
        }
      });
      
      if (response.data.articles.length > 0) {
        const article = response.data.articles[0];
        setNews({
          ...article,
          funny_headline: article.title,
          image_suggestions: [{ url: article.image_url, style: 'default' }]
        });
        setSelectedHeadline(article.title);
        setSelectedImage({ url: article.image_url, style: 'default' });
        showSnackbar('New story loaded successfully!');
      } else {
        showSnackbar('No stories found matching your criteria', 'warning');
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      showSnackbar('Failed to fetch news', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEngagement = async (tweetId) => {
    try {
      const response = await axios.get(`${API_URL}/engagement/${tweetId}`);
      setEngagement(response.data);
    } catch (err) {
      console.error('Failed to fetch engagement stats:', err);
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
  };

  const generateNewImages = async (headline) => {
    try {
      setImageLoading(true);
      const response = await axios.post(`${API_URL}/generate-images`, { headline });
      setNews(prev => ({
        ...prev,
        image_suggestions: response.data.image_suggestions
      }));
      setSelectedImage(response.data.image_suggestions[0]);
      showSnackbar('New images generated!');
    } catch (err) {
      console.error('Failed to generate new images:', err);
      showSnackbar('Failed to generate new images', 'error');
    } finally {
      setImageLoading(false);
    }
  };

  const postToX = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/post-to-x`, {
        ...news,
        funny_headline: selectedHeadline,
        image_url: selectedImage.url
      });
      setNews(response.data);
      if (response.data.tweet_id) {
        fetchEngagement(response.data.tweet_id);
        // Add to post history
        setPostHistory(prev => [{
          id: response.data.tweet_id,
          headline: selectedHeadline,
          timestamp: new Date(),
          engagement: null
        }, ...prev].slice(0, 5));
      }
      showSnackbar('Successfully posted to X!');
    } catch (err) {
      setError('Failed to post to X. Please try again later.');
      showSnackbar('Failed to post to X', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyContent = async () => {
    const content = {
      headline: selectedHeadline,
      description: news.description,
      url: news.url,
      imageUrl: selectedImage?.url
    };
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      setCopied(true);
      showSnackbar('Content copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showSnackbar('Failed to copy content', 'error');
    }
  };

  const handlePostApproval = () => {
    setApprovalDialog(true);
    setCustomTweet(`${selectedHeadline}\n\nRead more: ${news.url}`);
  };

  const handlePostConfirm = async () => {
    setApprovalDialog(false);
    // Update the headline with the edited tweet text
    setSelectedHeadline(customTweet.split('\n')[0]); // Use first line as headline
    await postToX();
  };

  const handleCustomTweetChange = (event) => {
    setCustomTweet(event.target.value);
  };

  const handleResetTweet = () => {
    setCustomTweet(`${selectedHeadline}\n\nRead more: ${news.url}`);
  };

  const fetchSuggestedStories = async () => {
    try {
      const response = await axios.get(`${API_URL}/news/suggestions`, {
        params: {
          category: selectedCategory,
          query: searchQuery
        }
      });
      setSuggestedStories(response.data);
    } catch (err) {
      console.error('Failed to fetch suggested stories:', err);
    }
  };

  const handleSaveStory = () => {
    setSavedStories(prev => [...prev, {
      id: Date.now(),
      headline: selectedHeadline,
      description: news.description,
      image: selectedImage?.url,
      timestamp: new Date()
    }]);
    showSnackbar('Story saved successfully!');
  };

  const handleShareStory = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: selectedHeadline,
          text: news.description,
          url: news.url
        });
      } else {
        await navigator.clipboard.writeText(`${selectedHeadline}\n${news.description}\n${news.url}`);
        showSnackbar('Story link copied to clipboard!');
      }
    } catch (err) {
      console.error('Failed to share story:', err);
    }
  };

  const fetchBotTips = async (category = null) => {
    try {
      const response = await axios.get(`${API_URL}/bot/tips`, {
        params: { category }
      });
      setBotTips(response.data.tips);
    } catch (err) {
      console.error('Failed to fetch tips:', err);
    }
  };

  const handleBotMessage = async (message) => {
    try {
      setIsTyping(true);
      const response = await axios.post(`${API_URL}/bot/chat`, {
        message: message,
        context: {
          currentHeadline: selectedHeadline,
          currentImage: selectedImage?.url,
          engagement: engagement || {},
          savedStories: savedStories,
          postHistory: postHistory
        }
      });
      
      setBotMessages(prev => [...prev, 
        { type: 'user', content: message },
        { type: 'bot', content: response.data.message, suggestions: response.data.suggestions }
      ]);
    } catch (err) {
      console.error('Failed to get bot response:', err);
      showSnackbar('Failed to get bot response', 'error');
      setBotMessages(prev => [...prev, 
        { type: 'user', content: message },
        { type: 'bot', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
    handleBotMessage(suggestion);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (news?.tweet_id) {
      fetchEngagement(news.tweet_id);
      const interval = setInterval(() => fetchEngagement(news.tweet_id), 30000);
      return () => clearInterval(interval);
    }
  }, [news?.tweet_id]);

  useEffect(() => {
    fetchSuggestedStories();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (selectedBotCategory) {
      fetchBotTips(selectedBotCategory);
    } else {
      fetchBotTips();
    }
  }, [selectedBotCategory]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'n' && e.ctrlKey) {
        e.preventDefault();
        fetchNews();
      } else if (e.key === 'p' && e.ctrlKey) {
        e.preventDefault();
        handlePostApproval();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (savedStories.length > 0) {
      localStorage.setItem('savedStories', JSON.stringify(savedStories));
    }
  }, [savedStories]);

  useEffect(() => {
    const saved = localStorage.getItem('savedStories');
    if (saved) {
      setSavedStories(JSON.parse(saved));
    }
  }, []);

  const handleHeadlineChange = (headline) => {
    setSelectedHeadline(headline);
    generateNewImages(headline);
  };

  const FilterDialog = () => (
    <Dialog
      open={filterDialog}
      onClose={() => setFilterDialog(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <FilterListIcon color="primary" />
          <Typography>Advanced Filters</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Region Selection */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Region
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {regions.map((region) => (
                <Chip
                  key={region.id}
                  label={region.label}
                  icon={region.icon}
                  onClick={() => setSelectedRegion(region.id)}
                  color={selectedRegion === region.id ? 'primary' : 'default'}
                />
              ))}
            </Box>
          </Box>

          {/* Time Range */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Time Range
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {timeRanges.map((range) => (
                <Chip
                  key={range.id}
                  label={range.label}
                  icon={range.icon}
                  onClick={() => setSelectedTimeRange(range.id)}
                  color={selectedTimeRange === range.id ? 'primary' : 'default'}
                />
              ))}
            </Box>
          </Box>

          {/* Minimum Engagement */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Minimum Predicted Engagement
            </Typography>
            <Slider
              value={minEngagement}
              onChange={(e, value) => setMinEngagement(value)}
              min={0}
              max={1000}
              step={100}
              marks
              valueLabelDisplay="auto"
            />
            <Typography variant="caption" color="text.secondary">
              {minEngagement} predicted likes
            </Typography>
          </Box>

          {/* Exclude Keywords */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Exclude Keywords (comma-separated)
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={excludeKeywords}
              onChange={(e) => setExcludeKeywords(e.target.value)}
              placeholder="e.g., politics, sports, weather"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setFilterDialog(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setFilterDialog(false);
            fetchNews();
          }}
        >
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Add auto mode functions
  const startAutoMode = () => {
    setAutoMode(true);
    const interval = setInterval(fetchAutomatedNews, autoSettings.checkInterval * 60 * 1000);
    setAutoCheckInterval(interval);
    fetchAutomatedNews(); // Initial fetch
  };

  const stopAutoMode = () => {
    setAutoMode(false);
    if (autoCheckInterval) {
      clearInterval(autoCheckInterval);
      setAutoCheckInterval(null);
    }
  };

  const fetchAutomatedNews = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/news/automated`, autoSettings);
      
      if (response.data.articles.length > 0) {
        const article = response.data.articles[0];
        setNews({
          ...article,
          funny_headline: article.title,
          image_suggestions: [{ url: article.image_url, style: 'default' }]
        });
        setSelectedHeadline(article.title);
        setSelectedImage({ url: article.image_url, style: 'default' });
        
        // Auto-post if enabled
        if (autoSettings.autoPost) {
          handlePostApproval();
        }
        
        showSnackbar('New story loaded automatically!');
      }
    } catch (err) {
      console.error('Failed to fetch automated news:', err);
      showSnackbar('Failed to fetch automated news', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Add Auto Mode Dialog component
  const AutoModeDialog = () => (
    <Dialog
      open={autoMode}
      onClose={stopAutoMode}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <AutoAwesomeIcon color="primary" />
          <Typography>Automated News Monitoring</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Priority Thresholds */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Priority Thresholds
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                  Minimum Viral Potential: {autoSettings.minViralPotential}
                </Typography>
                <Slider
                  value={autoSettings.minViralPotential}
                  onChange={(e, value) => setAutoSettings(prev => ({ ...prev, minViralPotential: value }))}
                  min={0}
                  max={1}
                  step={0.1}
                  marks
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                  Minimum Engagement Score: {autoSettings.minEngagementScore}
                </Typography>
                <Slider
                  value={autoSettings.minEngagementScore}
                  onChange={(e, value) => setAutoSettings(prev => ({ ...prev, minEngagementScore: value }))}
                  min={0}
                  max={1}
                  step={0.1}
                  marks
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                  Minimum Freshness Score: {autoSettings.minFreshnessScore}
                </Typography>
                <Slider
                  value={autoSettings.minFreshnessScore}
                  onChange={(e, value) => setAutoSettings(prev => ({ ...prev, minFreshnessScore: value }))}
                  min={0}
                  max={1}
                  step={0.1}
                  marks
                />
              </Grid>
            </Grid>
          </Box>

          {/* Source Selection */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Preferred Sources
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {sourceOptions.map((source) => (
                <Chip
                  key={source.value}
                  label={source.label}
                  onClick={() => {
                    setAutoSettings(prev => ({
                      ...prev,
                      preferredSources: prev.preferredSources.includes(source.value)
                        ? prev.preferredSources.filter(s => s !== source.value)
                        : [...prev.preferredSources, source.value]
                    }));
                  }}
                  color={autoSettings.preferredSources.includes(source.value) ? 'primary' : 'default'}
                  icon={<SourceIcon />}
                />
              ))}
            </Box>
          </Box>

          {/* Keywords Boost */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Keywords Boost
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={autoSettings.keywordsBoost.join(', ')}
              onChange={(e) => setAutoSettings(prev => ({
                ...prev,
                keywordsBoost: e.target.value.split(',').map(k => k.trim())
              }))}
              placeholder="Enter keywords separated by commas"
              helperText="These keywords will boost story priority"
            />
          </Box>

          {/* Auto Post Settings */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Auto Post Settings
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={autoSettings.autoPost}
                  onChange={(e) => setAutoSettings(prev => ({ ...prev, autoPost: e.target.checked }))}
                />
              }
              label="Auto-post top stories"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={autoSettings.autoRetry}
                  onChange={(e) => setAutoSettings(prev => ({ ...prev, autoRetry: e.target.checked }))}
                />
              }
              label="Auto-retry on failure"
            />
          </Box>

          {/* Check Interval */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Check Interval (minutes)
            </Typography>
            <Slider
              value={autoSettings.checkInterval}
              onChange={(e, value) => setAutoSettings(prev => ({ ...prev, checkInterval: value }))}
              min={1}
              max={60}
              step={1}
              marks
            />
            <Typography variant="caption" color="text.secondary">
              Check every {autoSettings.checkInterval} minutes
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={stopAutoMode} color="error">
          Stop Auto Mode
        </Button>
      </DialogActions>
    </Dialog>
  );

  const handleQuickPost = async (postData) => {
    try {
      setLoading(true);
      if (postData.schedule) {
        // Add to scheduled posts
        setScheduledPosts(prev => [...prev, {
          ...postData,
          id: Date.now(),
          scheduledFor: postData.schedule
        }]);
        showSnackbar('Post scheduled successfully!');
      } else {
        // Post immediately
        const response = await axios.post(`${API_URL}/post-to-x`, {
          ...postData,
          image_url: selectedImage?.url
        });
        
        if (response.data.tweet_id) {
          fetchEngagement(response.data.tweet_id);
          setPostHistory(prev => [{
            id: response.data.tweet_id,
            headline: postData.type === 'single' ? postData.text : postData.posts[0],
            timestamp: new Date()
          }, ...prev].slice(0, 5));
        }
        showSnackbar('Posted successfully to X!');
      }
    } catch (err) {
      console.error('Failed to post:', err);
      showSnackbar('Failed to post to X', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScheduledPost = (postId) => {
    setScheduledPosts(prev => prev.filter(post => post.id !== postId));
    showSnackbar('Scheduled post deleted');
  };

  const handleEditScheduledPost = (post) => {
    setScheduledPostsDialog(false);
    setQuickPostDialog(true);
    // Pre-fill the quick post dialog with the scheduled post data
    if (post.type === 'thread') {
      setThreadMode(true);
      setThreadPosts(post.posts);
    } else {
      setPostText(post.text);
    }
    setSchedule(true);
    setScheduleTime(new Date(post.scheduledFor));
    setImagePreview(post.image);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ 
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 10% 20%, rgba(255,107,107,0.05) 0%, transparent 20%),
          radial-gradient(circle at 90% 80%, rgba(78,205,196,0.05) 0%, transparent 20%)
        `,
        pt: 4,
        pb: 8
      }}>
        <Box sx={{ my: 4 }}>
          <Fade in timeout={1000}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom 
              align="center" 
              sx={{ 
                mb: 4,
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.5rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Weird News X Generator
            </Typography>
          </Fade>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Add keyboard shortcuts help */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="Keyboard shortcuts: Ctrl+N (New story), Ctrl+P (Post)">
              <IconButton size="small">
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Search and Categories */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search for stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, flex: 1 }}>
                    {categories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        onClick={() => setSelectedCategory(category)}
                        color={selectedCategory === category ? 'primary' : 'default'}
                        icon={<CategoryIcon />}
                      />
                    ))}
                  </Box>
                  <IconButton
                    color="primary"
                    onClick={() => setFilterDialog(true)}
                    sx={{ ml: 2 }}
                  >
                    <FilterListIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={3}>
            {/* Main Content */}
            <Grid item xs={12} md={8}>
              {loading ? (
                <LoadingSkeleton />
              ) : news ? (
                <Zoom in timeout={500}>
                  <Box>
                    {/* Headline Showcase */}
                    <HeadlineCard 
                      emotion={selectedHeadline.includes('😱') ? 'shocking' : 
                              selectedHeadline.includes('😂') ? 'funny' :
                              selectedHeadline.includes('🤯') ? 'mysterious' :
                              selectedHeadline.includes('❤️') ? 'heartwarming' :
                              selectedHeadline.includes('🎉') ? 'excited' : 'silly'}
                      sx={{ mb: 3 }}
                    >
                      <CardContent>
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            color: 'white',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                            fontWeight: 'bold',
                            lineHeight: 1.4
                          }}
                        >
                          {selectedHeadline}
                        </Typography>
                      </CardContent>
                    </HeadlineCard>

                    {/* Existing content */}
                    <Card>
                      <CardMedia
                        component="img"
                        height="400"
                        image={selectedImage?.url || news.image_url}
                        alt={news.title}
                        onError={handleImageError}
                        sx={{ 
                          transition: 'all 0.3s ease-in-out',
                          opacity: imageLoading ? 0.5 : 1,
                          '&:hover': {
                            transform: 'scale(1.02)'
                          }
                        }}
                      />
                      <CardContent>
                        {/* Existing content */}
                        
                        {/* Headline Variations with Emotions */}
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="h6" gutterBottom>
                            Try Different Headlines:
                          </Typography>
                          <Grid container spacing={2}>
                            {news.font_suggestions.map((headline, index) => (
                              <Grid item xs={12} sm={6} key={index}>
                                <HeadlineCard
                                  emotion={headline.includes('😱') ? 'shocking' : 
                                          headline.includes('😂') ? 'funny' :
                                          headline.includes('🤯') ? 'mysterious' :
                                          headline.includes('❤️') ? 'heartwarming' :
                                          headline.includes('🎉') ? 'excited' : 'silly'}
                                  sx={{
                                    cursor: 'pointer',
                                    opacity: selectedHeadline === headline ? 1 : 0.8,
                                  }}
                                  onClick={() => handleHeadlineChange(headline)}
                                >
                                  <CardContent>
                                    <Typography 
                                      variant="body1"
                                      sx={{ 
                                        color: 'white',
                                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                                      }}
                                    >
                                      {headline}
                                    </Typography>
                                  </CardContent>
                                </HeadlineCard>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Zoom>
              ) : null}
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Slide direction="left" in={!!news} timeout={500}>
                <Box>
                  {/* Quick Actions */}
                  <Card sx={{ mb: 3, elevation: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Quick Actions
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<BookmarkIcon />}
                            onClick={handleSaveStory}
                          >
                            Save
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<ShareIcon />}
                            onClick={handleShareStory}
                          >
                            Share
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<ContentCopyIcon />}
                            onClick={handleCopyContent}
                          >
                            Copy
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* Suggested Stories */}
                  <Card sx={{ mb: 3, elevation: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Suggested Stories
                      </Typography>
                      {suggestedStories.map((story, index) => (
                        <Paper
                          key={index}
                          sx={{
                            p: 2,
                            mb: 2,
                            cursor: 'pointer',
                            '&:hover': {
                              bgcolor: 'action.hover',
                              transform: 'translateX(4px)',
                              transition: 'all 0.2s'
                            }
                          }}
                          onClick={() => {
                            setNews(story);
                            setSelectedHeadline(story.funny_headline);
                            setSelectedImage(story.image_suggestions[0]);
                          }}
                        >
                          <Typography variant="subtitle2" noWrap>
                            {story.funny_headline}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {story.description.substring(0, 50)}...
                          </Typography>
                        </Paper>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Saved Stories */}
                  {savedStories.length > 0 && (
                    <Card sx={{ mb: 3, elevation: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Saved Stories
                        </Typography>
                        {savedStories.map((story) => (
                          <Paper
                            key={story.id}
                            sx={{
                              p: 2,
                              mb: 2,
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: 'action.hover',
                                transform: 'translateX(4px)',
                                transition: 'all 0.2s'
                              }
                            }}
                            onClick={() => {
                              setNews({
                                ...story,
                                image_suggestions: [{ url: story.image }]
                              });
                              setSelectedHeadline(story.headline);
                              setSelectedImage({ url: story.image });
                            }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {story.headline}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(story.timestamp).toLocaleDateString()}
                            </Typography>
                          </Paper>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Engagement Stats */}
                  {engagement && (
                    <Card sx={{ mb: 3, elevation: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Engagement Stats:
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                              <Tooltip title="Likes">
                                <Box>
                                  <FavoriteIcon color="error" />
                                  <Typography>{engagement.likes}</Typography>
                                </Box>
                              </Tooltip>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                              <Tooltip title="Retweets">
                                <Box>
                                  <RepeatIcon color="primary" />
                                  <Typography>{engagement.retweets}</Typography>
                                </Box>
                              </Tooltip>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                              <Tooltip title="Replies">
                                <Box>
                                  <ChatBubbleIcon color="secondary" />
                                  <Typography>{engagement.replies}</Typography>
                                </Box>
                              </Tooltip>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                              <Tooltip title="Impressions">
                                <Box>
                                  <VisibilityIcon color="action" />
                                  <Typography>{engagement.impressions}</Typography>
                                </Box>
                              </Tooltip>
                            </Paper>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  )}

                  {/* Post History */}
                  {postHistory.length > 0 && (
                    <Card sx={{ elevation: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Recent Posts:
                        </Typography>
                        {postHistory.map((post) => (
                          <Paper key={post.id} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="body2" noWrap>
                              {post.headline}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(post.timestamp).toLocaleString()}
                            </Typography>
                          </Paper>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </Box>
              </Slide>
            </Grid>
          </Grid>

          {/* AI Assistant Bot */}
          <Box
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000
            }}
          >
            {!botOpen ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setBotOpen(true);
                  fetchBotTips();
                }}
                sx={{
                  borderRadius: '50%',
                  width: 64,
                  height: 64,
                  minWidth: 64,
                  background: 'linear-gradient(45deg, #4ECDC4 30%, #6FF7EE 90%)',
                  boxShadow: '0 4px 20px rgba(78,205,196,0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #37B8B0 30%, #4ECDC4 90%)',
                    transform: 'scale(1.1) rotate(10deg)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <SmartToyIcon sx={{ fontSize: 32 }} />
              </Button>
            ) : (
              <Card
                sx={{
                  width: 350,
                  maxHeight: 600,
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
                  border: '1px solid rgba(78,205,196,0.2)',
                  boxShadow: '0 8px 32px rgba(78,205,196,0.15)',
                  overflow: 'hidden'
                }}
              >
                <CardContent sx={{ p: 2, pb: 1 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    background: 'linear-gradient(45deg, #4ECDC4 30%, #6FF7EE 90%)',
                    p: 1.5,
                    borderRadius: 2,
                    color: 'white'
                  }}>
                    <SmartToyIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>AI Assistant</Typography>
                    <IconButton
                      size="small"
                      onClick={() => setBotOpen(false)}
                      sx={{ 
                        color: 'white',
                        '&:hover': {
                          transform: 'rotate(90deg)',
                          bgcolor: 'rgba(255,255,255,0.1)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>

                  {/* Quick Tips Categories */}
                  <Box sx={{ mt: 2 }}>
                    {botTips.map((tip, index) => (
                      <Paper key={index} sx={{ p: 2, mb: 2 }}>
                        <Typography variant="body2">{tip}</Typography>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>

          {/* Auto Mode Button */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={autoMode ? "contained" : "outlined"}
                color="primary"
                startIcon={<SpeedIcon />}
                onClick={autoMode ? stopAutoMode : startAutoMode}
              >
                {autoMode ? 'Stop Auto Mode' : 'Start Auto Mode'}
              </Button>
              {autoMode && (
                <Chip
                  icon={<TimerIcon />}
                  label={`Check every ${autoSettings.checkInterval}min`}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>
            <Tooltip title="Keyboard shortcuts: Ctrl+N (New story), Ctrl+P (Post)">
              <IconButton size="small">
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Dialogs */}
          <FilterDialog />
          <AutoModeDialog />

          {/* Approval Dialog */}
          <Dialog 
            open={approvalDialog} 
            onClose={() => setApprovalDialog(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircleIcon color="primary" />
                <Typography>Review & Edit Your Post</Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Edit your post text:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={customTweet}
                  onChange={handleCustomTweetChange}
                  variant="outlined"
                  placeholder="Write your tweet here..."
                  helperText="First line will be used as the headline"
                  sx={{ mt: 2 }}
                />
                {selectedImage?.url && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Selected Image:
                    </Typography>
                    <img 
                      src={selectedImage.url} 
                      alt="Preview" 
                      style={{ 
                        width: '100%', 
                        maxHeight: '200px', 
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }} 
                    />
                  </Box>
                )}
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Chip 
                    icon={<ContentCopyIcon />} 
                    label="Copy Text" 
                    onClick={() => {
                      navigator.clipboard.writeText(customTweet);
                      showSnackbar('Tweet text copied to clipboard!');
                    }}
                  />
                  <Chip 
                    icon={<RefreshIcon />} 
                    label="Reset" 
                    onClick={handleResetTweet}
                  />
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setApprovalDialog(false)}>
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handlePostConfirm}
                startIcon={<TwitterIcon />}
                disabled={!customTweet.trim()}
              >
                Post to X
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>

          {/* SpeedDial */}
          <SpeedDial
            ariaLabel="Post actions"
            sx={{ position: 'fixed', bottom: 24, right: 24 }}
            icon={<SpeedDialIcon />}
          >
            <SpeedDialAction
              icon={<PostAddIcon />}
              tooltipTitle="Quick Post"
              onClick={() => setQuickPostDialog(true)}
            />
            <SpeedDialAction
              icon={<QueueIcon />}
              tooltipTitle="Scheduled Posts"
              onClick={() => setScheduledPostsDialog(true)}
            />
            <SpeedDialAction
              icon={<ScheduleIcon />}
              tooltipTitle="Schedule New Post"
              onClick={() => {
                setQuickPostDialog(true);
                // Pre-set schedule mode
              }}
            />
            <SpeedDialAction
              icon={<AnalyticsIcon />}
              tooltipTitle="Analytics"
              onClick={() => setAnalyticsDashboard(true)}
            />
          </SpeedDial>

          {/* Quick Post Dialog */}
          <QuickPostDialog
            open={quickPostDialog}
            onClose={() => setQuickPostDialog(false)}
            post={{
              text: selectedHeadline ? `${selectedHeadline}\n\nRead more: ${news?.url}` : '',
              image: selectedImage?.url
            }}
            onPost={handleQuickPost}
          />

          {/* Scheduled Posts Dialog */}
          <ScheduledPostsDialog
            open={scheduledPostsDialog}
            onClose={() => setScheduledPostsDialog(false)}
            posts={scheduledPosts}
            onDelete={handleDeleteScheduledPost}
            onEdit={handleEditScheduledPost}
          />

          {/* Analytics Dashboard */}
          <AnalyticsDashboard
            open={analyticsDashboard}
            onClose={() => setAnalyticsDashboard(false)}
            postHistory={postHistory}
            engagement={engagement}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 