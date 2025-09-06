module.exports = {
  __esModule: true,
  default: (props) => (
    <svg {...props} data-testid={props['data-testid'] || 'svg-icon'} />
  ),
}
