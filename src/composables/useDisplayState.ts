import { computed, ref, watch } from "vue";
import { useContentStore } from "../store/content";
import { useApi } from "./useApi";

const useDisplayState = () => {
    type DisplayState = 'LOADING' | 'NO_DATA'| 'HAS_DATA';

    const contentStore = useContentStore();
    
    const displayState = computed<DisplayState>(() => {
        if (!contentStore.leckerlogs.length) return 'NO_DATA';
        return 'HAS_DATA';
      });

    return {
        displayState,
    }
};

export default useDisplayState