import { ButtonLink } from '../ui/button-link';

function ValueAction() {
  return (
    <div style={{ clipPath: 'inset(-8px)' }}>
      <div data-value="action" className="flex ml-5 md:ml-0">
        <ButtonLink variant="dark" href="" className="px-3 py-4 w-42">
          See it in action
        </ButtonLink>
      </div>
    </div>
  );
}

export default ValueAction;
