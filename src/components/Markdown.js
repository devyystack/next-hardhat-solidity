import PropTypes from 'prop-types';
import okaidia from 'prism-react-renderer/themes/okaidia';
import { MDXRemote } from 'next-mdx-remote';
import Highlight, { defaultProps } from 'prism-react-renderer';
// icons
import quotesIcon from '@iconify/icons-carbon/quotes';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Stack, Divider, Typography } from '@mui/material';
// components
import { Image, Iconify } from '.';

// ----------------------------------------------------------------------

const MARGIN = {
  marginTop: 24,
  marginBottom: 16,
};

export const RootStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'firstLetter',
})(({ firstLetter, theme }) => ({
  // Heading
  '& h1': { ...MARGIN, ...theme.typography.h1 },
  '& h2': { ...MARGIN, ...theme.typography.h2 },
  '& h3': { ...MARGIN, ...theme.typography.h3 },
  '& h4': { ...MARGIN, ...theme.typography.h4 },
  '& h5': { ...MARGIN, ...theme.typography.h5 },
  '& h6': { ...MARGIN, ...theme.typography.h6 },
  '& p': { marginBottom: theme.spacing(2) },

  // Code
  '& code': {
    color: theme.palette.secondary.main,
  },
  '& pre': {
    margin: theme.spacing(5, 0),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 900 : 800],
    '& > pre': {
      overflow: 'auto',
      padding: theme.spacing(3, 3, 0, 3),
    },
  },

  // List
  '& ul, & ol': {
    marginBottom: theme.spacing(2),
    '& li': {
      lineHeight: 2,
    },
  },

  // First Letter
  ...(firstLetter && {
    '& > p:first-of-type': {
      '&:first-letter': {
        float: 'left',
        fontSize: 80,
        lineHeight: 1,
        paddingRight: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  }),
}));

// ----------------------------------------------------------------------

Markdown.propTypes = {
  content: PropTypes.object.isRequired,
  firstLetter: PropTypes.bool,
};

export default function Markdown({ content, firstLetter = false }) {
  return (
    <RootStyle firstLetter={firstLetter}>
      <MDXRemote {...content} components={components} />
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

export const components = {
  p: (props) => <Typography {...props} />,
  hr: (props) => <Divider {...props} />,
  a: LinkMDX,
  blockquote: BlockquoteMDX,
  img: ImageMDX,
  code: CodeMDX,
};

// ----------------------------------------------------------------------

LinkMDX.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};

function LinkMDX(props) {
  return !props.href.includes('http') ? (
    <NextLink href={props.href}>
      <Link {...props}>{props.children}</Link>
    </NextLink>
  ) : (
    <Link {...props} href={props.href} target="_blank" rel="noopener">
      {props.children}
    </Link>
  );
}

// ----------------------------------------------------------------------

ImageMDX.propTypes = {
  alt: PropTypes.string,
};

function ImageMDX(props) {
  return <Image alt={props.alt} ratio="16/9" sx={{ borderRadius: 2, my: 5 }} {...props} />;
}

// ----------------------------------------------------------------------

BlockquoteMDX.propTypes = {
  children: PropTypes.node,
};

function BlockquoteMDX(props) {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 3, md: 5 }}
      sx={{
        my: 5,
        p: { xs: 3, md: 5 },
      }}
    >
      <Iconify
        icon={quotesIcon}
        sx={{ width: 48, height: 48, color: 'text.disabled', opacity: 0.48 }}
      />
      <Typography variant="h5">{props.children}</Typography>
    </Stack>
  );
}

// ----------------------------------------------------------------------

CodeMDX.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

function CodeMDX(props) {
  const { children, className } = props;
  const language = className?.replace(/language-/, '');
  return (
    <Highlight {...defaultProps} code={children} theme={okaidia} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, backgroundColor: 'transparent' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
