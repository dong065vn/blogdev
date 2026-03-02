---
description: Vẽ Flowchart bằng Mermaid từ mô tả ứng dụng
---

# /flow - Tạo Flowchart

## Cách dùng
```
/flow [mô tả ứng dụng/quy trình]
```

## Quy trình

### Step 1: Phân tích flow
1. Phân tích mô tả → xác định actors, actions, decisions
2. Xác định flow type phù hợp:
   - `flowchart` - Quy trình tổng quan
   - `sequenceDiagram` - Interaction giữa các thành phần
   - `stateDiagram` - State transitions
   - `journey` - User journey

### Step 2: Tạo Mermaid diagram
3. Viết Mermaid code theo best practices:
   - Tên node rõ ràng, ngắn gọn
   - Group related nodes với subgraph
   - Dùng shapes đúng: `[]` process, `{}` decision, `()` start/end
   - Label cho mỗi arrow/connection
4. Thêm styling cho readability:
   - Color-code theo category
   - Highlight critical paths

### Step 3: Validate & Iterate
5. Kiểm tra diagram:
   - Đủ bước? Thiếu edge case nào?
   - Mỗi decision có đủ branches?
   - Flow có dead-end không?
6. Render và review với user

## Skills sử dụng
- `mermaid-expert` - Mermaid diagram syntax
- `brainstorming` - Phân tích yêu cầu
- `docs-architect` - Documentation patterns

## Output
- Mermaid flowchart diagram (render-ready)
- File `docs/flowchart.md` trong project
- Giải thích các bước chính
