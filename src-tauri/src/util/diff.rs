pub struct Difference {
    pub offset: usize,
    pub value1: u8,
    pub value2: u8,
}

impl std::fmt::Display for Difference {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}: {} - {}", self.offset, self.value1, self.value2)
    }
}

pub fn _diff_vecs(input1: &[u8], input2: &[u8]) -> Vec<Difference> {
    let mut differences = Vec::new();
    let min_length = std::cmp::min(input1.len(), input2.len());

    for i in 0..min_length {
        if input1[i] != input2[i] {
            differences.push(Difference {
                offset: i,
                value1: input1[i],
                value2: input2[i],
            });
        }
    }

    differences
}
