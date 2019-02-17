import { TestCase } from './testcase.model';

export /**
 * TreeNode
 */
    class TreeNode extends TestCase {
    expanded: boolean;
    selected: boolean;
    children: TreeNode[];
}
