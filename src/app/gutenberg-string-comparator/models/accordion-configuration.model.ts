export interface AccordionConfiguration {
  itemsPerPage: number;
  page: number;
  pagesToDisplay: number;
  shouldRotate: boolean;
  showBoundaryButtons: boolean;
  showEllipsis: boolean;
}

export const ACCORDION_CONFIGURATION: AccordionConfiguration = {
  itemsPerPage: 10,
  page: 1,
  pagesToDisplay: 15,
  shouldRotate: true,
  showBoundaryButtons: true,
  showEllipsis: false
};
