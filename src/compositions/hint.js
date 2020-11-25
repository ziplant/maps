import { ref } from '@vue/composition-api';

export default function useHint() {
  const hintMessage = ref('');
  let hintTimer = null;

  const showHint = (data) => {
    clearTimeout(hintTimer);

    hintMessage.value = data;

    hintTimer = setTimeout(() => {
      hintMessage.value = '';
    }, 2000);
  };

  return {
    hintMessage,
    showHint,
  };
}
