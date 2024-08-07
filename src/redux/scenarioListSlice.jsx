import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scenarioList: [], // Initial empty array of scenarios
};

const scenarioListSlice = createSlice({
  name: 'scenarioListSlice',
  initialState,
  reducers: {
    addScenario: (state, action) => {
      state.scenarioList.push(action.payload);
    },
    updateScenario: (state, action) => {
      const { index, scenario } = action.payload;
      state.scenarioList[index] = scenario;
    },

    changeScenarioName: (state, action) => {
      const { index, newName } = action.payload;
      state.scenarioList[index].name = newName;
    },

    changeScenarioDescription: (state, action) => {
      const { index, newDescription } = action.payload;
      state.scenarioList[index].description = newDescription;
    },

    changeScenarioRequired: (state, action) => {
      const { index, newRequired } = action.payload;
      state.scenarioList[index].required = newRequired;
    },

    changeScenarioImage: (state, action) => {
      const { index, newImage } = action.payload;
      state.scenarioList[index].image = newImage;
    },

    changeScenarioUrl: (state, action) => {
      const { index, newUrl } = action.payload;
      state.scenarioList[index].url = newUrl;
    },

    changeScenarioActionList: (state, action) => {
      const { index, newActionList } = action.payload;
      state.scenarioList[index].actions = newActionList;
    },

    changeScenarioValidDataSets: (state, action) => {
      const { index, newValidDataSets } = action.payload;
      state.scenarioList[index].validDataSets = newValidDataSets;
    },

    removeScenario: (state, action) => {
      const index = action.payload;
      state.scenarioList.splice(index, 1);
    },
  },
});

export const { addScenario, updateScenario, removeScenario, changeScenarioName, changeScenarioDescription, changeScenarioRequired, changeScenarioImage, changeScenarioUrl, changeScenarioActionList, changeScenarioValidDataSets } = scenarioListSlice.actions;
export default scenarioListSlice.reducer;
